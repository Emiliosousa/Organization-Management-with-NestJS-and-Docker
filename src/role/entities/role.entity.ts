import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from '../../organization/entities/organization.entity';
import { Document } from '../../document/entities/document.entity';
import { Subject } from '../../subject/entities/subject.entity';
import { RoleStatus } from './role-status.enum';
import { Session } from '../../session/entities/session.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column()
  name: string;

  @Column()
  organizationId: number;

  @ManyToOne(() => Organization, (organization) => organization.roles)
  @JoinColumn({
    name: 'organizationId',
    referencedColumnName: 'organizationId',
  })
  organization: Organization;

  @Column({ type: 'enum', enum: RoleStatus, default: RoleStatus.ACTIVE })
  roleStatus: RoleStatus;

  @Column({
    name: 'permissionsJson',
    type: 'text',
    transformer: {
      to: (value: string[]) => JSON.stringify(value || []),
      from: (value: string) => JSON.parse(value || '[]'),
    },
  })
  permissions: string[];

  @OneToMany(() => Document, (document) => document.role)
  documents: Document[];

  @OneToMany(() => Session, (session) => session.role)
  sessions: Session[];
}
