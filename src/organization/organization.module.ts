import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { SubjectModule } from '../subject/subject.module';
import { RoleModule } from '../role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [
    SubjectModule,
    RoleModule,
    TypeOrmModule.forFeature([Organization]),
  ],
  exports: [OrganizationService],
})
export class OrganizationModule {}
