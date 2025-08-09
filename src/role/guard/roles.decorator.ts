import { Reflector } from '@nestjs/core';
import { Permission } from '../../session/entities/permission.enum';

export const Roles = Reflector.createDecorator<{
  permission: Permission;
}>();
