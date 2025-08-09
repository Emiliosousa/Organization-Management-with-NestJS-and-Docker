import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { Session } from '../../session/entities/session.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredPermission = this.reflector.get(Roles, context.getHandler());
    if (!requiredPermission) return true;
    const request = context.switchToHttp().getRequest();
    const session: Session = request['session'];

    // Get from params or query the organizationId
    const organizationId =
      +request.params.organizationId || +request.query.organizationId;

    // If the organizationId is present, check if the user belongs to the organization
    if (organizationId && session.organizationId !== organizationId)
      return false;

    // Check if the user has the required permission
    for (const permission of session.role.permissions) {
      if (permission === requiredPermission.permission) return true;
    }
    return false;
  }
}
