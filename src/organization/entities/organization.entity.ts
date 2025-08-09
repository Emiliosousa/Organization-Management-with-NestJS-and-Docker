import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from '../../subject/entities/subject.entity';
import { Role } from '../../role/entities/role.entity';
import { Document } from '../../document/entities/document.entity';
import { Session } from '../../session/entities/session.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  organizationId: number;

  @Column()
  name: string;

  @OneToMany(() => Subject, (subject) => subject.organization)
  subjects: Subject[];

  @OneToMany(() => Role, (role) => role.organization)
  roles: Role[];

  @OneToMany(() => Document, (document) => document.organization)
  documents: Document[];

  @OneToMany(() => Session, (session) => session.organization)
  sessions: Session[];
}
