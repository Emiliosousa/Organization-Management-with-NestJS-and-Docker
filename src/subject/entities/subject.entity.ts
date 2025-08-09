import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubjectStatus } from '../../session/entities/subject-status.enum';
import { Organization } from '../../organization/entities/organization.entity';
import { Document } from '../../document/entities/document.entity';
import { Session } from '../../session/entities/session.entity';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  subjectId: number;

  @Column()
  organizationId: number;

  @ManyToOne(() => Organization, (organization) => organization.subjects)
  @JoinColumn({
    name: 'organizationId',
    referencedColumnName: 'organizationId',
  })
  organization: Organization;

  @Column()
  password: string;

  @ManyToMany(() => Role,{ cascade: true })
  @JoinTable({
    name: 'subject_roles',
    joinColumn: {
      name: 'subjectId',
      referencedColumnName: 'subjectId',
    },
    inverseJoinColumn: {
      name: 'roleId',
      referencedColumnName: 'roleId',
    },
  })
  roles: Role[];

  @OneToMany(() => Document, (document) => document.creator)
  documents: Document[];

  @OneToMany(() => Session, (session) => session.subject)
  sessions: Session[];

  @Column()
  username: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ length: 2048 })
  publicKey: string;

  @Column()
  status: SubjectStatus;
}
