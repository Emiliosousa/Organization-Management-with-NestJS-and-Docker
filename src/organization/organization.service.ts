import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { SubjectService } from '../subject/subject.service';
import { RoleService } from '../role/role.service';
import { getAllPermissionsInStringArray } from '../session/entities/permission.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    private readonly subjectService: SubjectService,
    private readonly roleService: RoleService,
  ) {}

  /**
   * Create a new organization with new user with owner role with all permissions
   * @param createOrganizationDto
   */
  async create(createOrganizationDto: CreateOrganizationDto) {
    const organization = await this.organizationRepository.save({
      name: createOrganizationDto.organizationName,
    });
    const ownerRole = await this.roleService.create(
      organization.organizationId,
      {
        name: 'owner',
        permissions: getAllPermissionsInStringArray(),
      },
    );
    const newSubject = await this.subjectService.addSubjectToOrganization(
      organization.organizationId,
      {
        ...createOrganizationDto,
        roles: [ownerRole],
      },
    );
    return organization;
  }

  findAll() {
    return this.organizationRepository.find();
  }

  findOne(organizationId: number) {
    return this.organizationRepository.findOne({ where: { organizationId } });
  }

  update(organizationId: number, updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationRepository.update(organizationId, {
      name: updateOrganizationDto.organizationName,
    });
  }

  remove(organizationId: number) {
    return this.organizationRepository.delete({ organizationId });
  }
}
