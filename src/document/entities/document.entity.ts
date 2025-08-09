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
export class Document {
  @PrimaryGeneratedColumn()
  documentId: number;

  @Column()
  name: string;

  @Column()
  filename: string;

  @Column()
  organizationId: number;

  @ManyToOne(() => Organization, (organization) => organization.documents)
  @JoinColumn({
    name: 'organizationId',
    referencedColumnName: 'organizationId',
  })
  organization: Organization;

  @Column()
  creatorId: number;

  @ManyToOne(() => Subject, (subject) => subject.documents)
  @JoinColumn({
    name: 'creatorId',
    referencedColumnName: 'subjectId',
  })
  creator: Subject;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  algorithm: string;

  @Column({ length: 2000 })
  key: string;

  @Column()
  roleId: number;

  @ManyToOne(() => Role, (role) => role.documents)
  @JoinColumn({
    name: 'roleId',
    referencedColumnName: 'roleId',
  })
  role: Role;
}
