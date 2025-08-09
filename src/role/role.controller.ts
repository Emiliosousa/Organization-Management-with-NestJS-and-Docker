import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './guard/roles.decorator';
import { Permission } from '../session/entities/permission.enum';

@UseGuards(RolesGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * Get my roles
   * @param req
   */
  @Get()
  getMyRoles(@Req() req: any) {
    return this.roleService.getMyRoles(
      req['session'].organizationId,
      req['session'].subjectId,
    );
  }

  /**
   * Get permissions of a role
   * @param roleName
   * @param req
   */
  @Get('permissions/:roleName')
  getPermissions(@Param('roleName') roleName: string, @Req() req: any) {
    return this.roleService.getPermissions(
      roleName,
      req.session.organizationId,
    );
  }

  /**
   * Get roles by permission
   * @param permissionName
   * @param req
   */
  @Get('roles/:permissionName')
  getRolesByPermission(
    @Param('permissionName') permissionName: string,
    @Req() req: any,
  ) {
    return this.roleService.getRolesByPermission(
      permissionName,
      req.session.organizationId,
    );
  }

  @Post('suspend/:roleName')
  @Roles({ permission: Permission.ROLE_DOWN })
  suspend(@Param('roleName') roleName: string, @Req() req: any) {
    return this.roleService.suspendRole(roleName, req.session.organizationId);
  }

  @Post('activate/:roleName')
  @Roles({ permission: Permission.ROLE_UP })
  activate(@Param('roleName') roleName: string, @Req() req: any) {
    return this.roleService.activateRole(roleName, req.session.organizationId);
  }

  @Post('addRole/:username/:roleName')
  @Roles({ permission: Permission.SUBJECT_MOD })
  addRole(
    @Param('username') username: string,
    @Param('roleName') roleName: string,
    @Req() req: any,
  ) {
    return this.roleService.addRole(
      username,
      roleName,
      req.session.organizationId,
    );
  }

  @Post('delRole/:username/:roleName')
  @Roles({ permission: Permission.SUBJECT_MOD })
  removeRole(
    @Param('username') username: string,
    @Param('roleName') roleName: string,
    @Req() req: any,
  ) {
    return this.roleService.removeRole(
      username,
      roleName,
      req.session.organizationId,
    );
  }

  @Post('addPermission')
  @Roles({ permission: Permission.ROLE_MOD })
  addPermission(
    @Body('roleName') roleName: string,
    @Body('permission') permission: string,
    @Req() req: any,
  ) {
    return this.roleService.addPermission(
      roleName,
      permission,
      req.session.organizationId,
    );
  }

  @Post('removePermission')
  @Roles({ permission: Permission.ROLE_MOD })
  removePermission(
    @Body('roleName') roleName: string,
    @Body('permission') permission: string,
    @Req() req: any,
  ) {
    return this.roleService.removePermission(
      roleName,
      permission,
      req.session.organizationId,
    );
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto, @Req() req: any) {
    return this.roleService.create(req.session.organizationId, createRoleDto);
  }

  @Get(':organizationId')
  findAll(@Param('organizationId') organizationId: number) {
    return this.roleService.findAll(organizationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
