import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { RolesGuard } from '../role/guard/roles.guard';
import { Roles } from '../role/guard/roles.decorator';
import { Permission } from '../session/entities/permission.enum';

@UseGuards(RolesGuard)
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post('suspend/:subjectId')
  @Roles({ permission: Permission.SUBJECT_DOWN })
  suspend(@Param('subjectId') subjectId: number) {
    return this.subjectService.suspendSubject(subjectId);
  }

  @Post('activate/:subjectId')
  @Roles({ permission: Permission.SUBJECT_UP })
  activate(@Param('subjectId') subjectId: number) {
    return this.subjectService.activateSubject(subjectId);
  }

  @Post(':organizationId')
  @Roles({ permission: Permission.SUBJECT_NEW })
  create(
    @Body() createSubjectDto: CreateSubjectDto,
    @Param('organizationId') organizationId: number,
  ) {
    return this.subjectService.addSubjectToOrganization(
      organizationId,
      createSubjectDto,
    );
  }

  /**
   * Get subjects of my organization
   * @param req
   * @param name Filter by name
   */
  @Get('ofMyOrganization')
  subjectsOfMyOrganization(@Req() req: any, @Query('name') name: string) {
    return this.subjectService.findAll(req.session.organizationId, name);
  }

  /**
   * Get subjects by role
   * @param roleId
   */
  @Get('by-role/:roleName')
  subjectsByRole(@Param('roleName') roleName: string) {
    return this.subjectService.findByRole(roleName);
  }

  /**
   * Get roles of a subject
   * @param username
   * @param req
   */
  @Get('roles/:username')
  rolesOfSubject(@Param('username') username: string, @Req() req: any) {
    return this.subjectService.rolesOfSubject(
      username,
      req.session.organizationId,
    );
  }

  @Get(':organizationId')
  findAll(@Param('organizationId') organizationId: number) {
    return this.subjectService.findAll(organizationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(+id);
  }
}