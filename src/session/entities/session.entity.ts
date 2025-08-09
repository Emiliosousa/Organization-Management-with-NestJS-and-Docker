import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from '../../subject/entities/subject.entity';
import { Organization } from '../../organization/entities/organization.entity';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  sessionId: number;

  @Column()
  subjectId: number;

  @ManyToOne(() => Subject, (subject) => subject.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subjectId', referencedColumnName: 'subjectId' })
  subject: Subject;

  @Column()
  organizationId: number;

  @ManyToOne(() => Organization, (organization) => organization.sessions)
  @JoinColumn({
    name: 'organizationId',
    referencedColumnName: 'organizationId',
  })
  organization: Organization;

  @Column({ nullable: true })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.sessions)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'roleId' })
  role: Role;

  @Column()
  sessionToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expiresAt: Date;
}
