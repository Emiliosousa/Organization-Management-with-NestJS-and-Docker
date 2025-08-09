import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Like, Raw, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectService } from '../subject/subject.service';
import {
  getAllPermissionsInStringArray,
  Permission,
} from '../session/entities/permission.enum';
import { RoleStatus } from './entities/role-status.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly subjectService: SubjectService,
  ) {}

  create(organizationId: number, createRoleDto: CreateRoleDto) {
    return this.roleRepository.save({
      ...createRoleDto,
      permissions: createRoleDto.permissions || [],
      organizationId,
    });
  }

  findAll(organizationId: number) {
    return this.roleRepository.find({ where: { organizationId } });
  }

  findOne(roleId: number) {
    return this.roleRepository.findOne({ where: { roleId } });
  }

  update(roleId: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update({ roleId }, updateRoleDto);
  }

  remove(id: number) {
    return this.roleRepository.delete({ roleId: id });
  }

  getMyRoles(organizationId: number, subjectId: number) {
    return this.subjectService.getMyRoles(organizationId, subjectId);
  }

  async getPermissions(roleName: string, organizationId: number) {
    const role = await this.roleRepository.findOne({
      where: { name: roleName, organizationId },
    });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return role.permissions;
  }

  getRolesByPermission(permissionName: string, organizationId: number) {
    return this.roleRepository.find({
      where: {
        permissions: Raw(
          (alias) => `JSON_CONTAINS(${alias}, '"${permissionName}"')`,
        ),
        organizationId,
      },
      select: ['name', 'roleId'],
    });
  }

  async suspendRole(name: string, organizationId: number) {
    const role = await this.roleRepository.findOne({
      where: { name, organizationId },
    });
    if (!role) {
      throw new HttpException('Role not found ', HttpStatus.NOT_FOUND);
    } else if (role.roleStatus === RoleStatus.SUSPENDED) {
      throw new HttpException('Role already suspended', HttpStatus.CONFLICT);
    }
    await this.roleRepository.update(
      { name, organizationId },
      { roleStatus: RoleStatus.SUSPENDED },
    );
    return 'Role suspended';
  }

  async activateRole(name: string, organizationId: number) {
    const role = await this.roleRepository.findOne({
      where: { name, organizationId },
    });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    } else if (role.roleStatus === RoleStatus.ACTIVE) {
      throw new HttpException('Role already active', HttpStatus.CONFLICT);
    }
    await this.roleRepository.update(
      { name, organizationId },
      { roleStatus: RoleStatus.ACTIVE },
    );
    return 'Role activated';
  }

  async addPermission(
    roleName: string,
    permission: string,
    organizationId: number,
  ) {
    if (getAllPermissionsInStringArray().indexOf(permission) === -1) {
      throw new HttpException('Permission not found', HttpStatus.NOT_FOUND);
    }
    const role = await this.getRoleByNameAndOrganization(
      roleName,
      organizationId,
    );
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    if (role.permissions.includes(permission)) {
      throw new HttpException('Permission already exists', HttpStatus.CONFLICT);
    }
    role.permissions.push(permission);
    await this.roleRepository.save(role);
    return permission + ' added to ' + roleName;
  }

  async removePermission(
    roleName: string,
    permission: string,
    organizationId: number,
  ) {
    const role = await this.getRoleByNameAndOrganization(
      roleName,
      organizationId,
    );
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    if (!role.permissions.includes(permission)) {
      throw new HttpException('Permission not found', HttpStatus.NOT_FOUND);
    }
    role.permissions = role.permissions.filter((p) => p !== permission);
    await this.roleRepository.save(role);
    return permission + ' removed from ' + roleName;
  }

  async addRole(username: string, roleName: string, organizationId: number) {
    const subject =
      await this.subjectService.findOneByUsernameAndOrganizationId(
        username,
        organizationId,
      );
    if (!subject) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }
    const role = await this.roleRepository.findOne({
      where: { name: roleName, organizationId },
    });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return this.subjectService.assumeRole(role, subject.subjectId);
  }

  async removeRole(username: string, roleName: string, organizationId: number) {
    const subject =
      await this.subjectService.findOneByUsernameAndOrganizationId(
        username,
        organizationId,
      );
    if (!subject) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }
    const role = await this.roleRepository.findOne({
      where: { name: roleName, organizationId },
    });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return this.subjectService.dropRole(role.roleId, subject.subjectId);
  }

  private async getRoleByNameAndOrganization(
    roleName: string,
    organizationId: number,
  ) {
    return this.roleRepository.findOne({
      where: { name: roleName, organizationId },
    });
  }
}
