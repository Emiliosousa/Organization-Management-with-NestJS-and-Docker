import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SubjectStatus } from '../session/entities/subject-status.enum';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}
  async addSubjectToOrganization(
    organizationId: number,
    createSubjectDto: CreateSubjectDto,
  ) {
    createSubjectDto.password = await bcrypt.hash(
      createSubjectDto.password,
      10,
    );
    return this.subjectRepository.save({
      ...createSubjectDto,
      organizationId,
      status: SubjectStatus.ACTIVE,
    });
  }

  /**
   * Check user's password
   * @param username
   * @param password
   */
  async checkPassword(username: string, password: string) {
    const user = await this.subjectRepository.findOne({
      where: { username },
      relations: ['roles'],
    });
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  findAll(organizationId: number, name?: string) {
    return this.subjectRepository.find({
      where: { organizationId, ...(name && { fullName: Like(`%${name}%`) }) },
      select: ['subjectId', 'fullName', 'username', 'status', 'roles'],
      relations: ['roles'],
    });
  }

  findOne(subjectId: number) {
    return this.subjectRepository.findOne({
      where: { subjectId },
      relations: ['roles'],
    });
  }

  update(subjectIdd: number, updateSubjectDto: UpdateSubjectDto) {
    return this.subjectRepository.update(
      { subjectId: subjectIdd },
      {
        ...updateSubjectDto,
      },
    );
  }

  remove(subjectId: number) {
    return this.subjectRepository.delete({ subjectId });
  }

  async assumeRole(role: Role, subjectId: number) {
    const subject = await this.subjectRepository.findOne({
      where: { subjectId },
      relations: ['roles'],
    });
    const roleExists = subject.roles.find(
      (existingRole) => existingRole.roleId === role.roleId,
    );

    if (!roleExists) {
      subject.roles.push(role);
      await this.subjectRepository.save(subject);
      return role.name + ' added to ' + subject.username;
    }
    return subject.username + ' already has the role: ' + role.name;
  }

  async dropRole(roleId: number, subjectId: number) {
    const subject = await this.subjectRepository.findOne({
      where: { subjectId },
      relations: ['roles'],
    });
    const role = subject.roles.find((role) => role.roleId === roleId);
    if (role) {
      subject.roles = subject.roles.filter((role) => role.roleId !== roleId);
      await this.subjectRepository.save(subject);
      return role.name + ' removed from ' + subject.username;
    }
    return subject.username + ' does not have the role: ' + role.name;
  }

  async getMyRoles(organizationId: number, subjectId: number) {
    const subject = await this.subjectRepository.findOne({
      where: { subjectId, organizationId },
      relations: ['roles'],
    });
    return subject.roles;
  }

  findByRole(roleName: string) {
    return this.subjectRepository.find({
      where: { roles: { name: roleName } },
      select: ['subjectId', 'fullName', 'username', 'status', 'roles'],
    });
  }

  async rolesOfSubject(username: string, organizationId: number) {
    const subject = await this.subjectRepository.findOne({
      where: { username, organizationId },
      relations: ['roles'],
    });
    if (!subject) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }
    return subject.roles;
  }

  suspendSubject(subjectId: number) {
    return this.subjectRepository.update(
      { subjectId },
      { status: SubjectStatus.SUSPENDED },
    );
  }

  activateSubject(subjectId: number) {
    return this.subjectRepository.update(
      { subjectId },
      { status: SubjectStatus.ACTIVE },
    );
  }

  async findOneByUsernameAndOrganizationId(
    username: string,
    organizationId: number,
  ) {
    return this.subjectRepository.findOne({
      where: { username, organizationId },
    });
  }
}