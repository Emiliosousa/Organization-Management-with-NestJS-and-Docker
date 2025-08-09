import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly subjectService: SubjectService,
  ) {}

  /**
   * Create a new session
   * Check if the subject exists comparing its public key
   * @param createSessionDto
   */
  async create(createSessionDto: CreateSessionDto) {
    const user = await this.subjectService.checkPassword(
      createSessionDto.username,
      createSessionDto.password,
    );
    if (user) {
      const sessionToken =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      // The expiration time is set to 1 day
      return this.sessionRepository.save({
        sessionToken,
        organizationId: user.organizationId,
        subjectId: user.subjectId,
        roleId: user.roles[0].roleId,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
    } else {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getSession(token: string) {
    const session = await this.sessionRepository.findOne({
      where: { sessionToken: token },
      relations: ['role'],
    });
    if (!session) {
      throw new HttpException('Incorrect token', HttpStatus.NOT_FOUND);
    }
    if (session.expiresAt && session.expiresAt < new Date()) {
      throw new HttpException('Session expired', HttpStatus.UNAUTHORIZED);
    }
    return session;
  }

  async assumeRole(roleName: string, sessionId: number) {
    // Check if the user has the role
    const session = await this.sessionRepository.findOne({
      where: { sessionId },
    });
    const subject = await this.subjectService.findOne(session.subjectId);
    if (!subject.roles.find((role) => role.name === roleName)) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    const role = subject.roles.find((role) => role.name === roleName);
    const hasBeenUpdated = await this.sessionRepository.update(
      { sessionId },
      { roleId: role.roleId },
    );
    if (!hasBeenUpdated.affected) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return role.name + ' assumed';
  }

  async dropRole(sessionId: number) {
    await this.sessionRepository.update({ sessionId }, { roleId: null });
    return 'Role dropped';
  }
}
