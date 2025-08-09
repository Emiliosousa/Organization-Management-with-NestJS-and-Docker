import { Controller, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { Roles } from '../role/guard/roles.decorator';
import { Permission } from './entities/permission.enum';
import { RolesGuard } from '../role/guard/roles.guard';

@UseGuards(RolesGuard)
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto);
  }

  /**
   * Assume a role
   * @param roleName
   * @param req
   */
  @Post('assume/:roleName')
  assumeRole(@Param('roleName') roleName: string, @Req() req: any) {
    return this.sessionService.assumeRole(roleName, req['session'].sessionId);
  }

  /**
   * Drop a role
   * @param roleId
   * @param req
   */
  @Post('drop')
  dropRole(@Req() req: any) {
    return this.sessionService.dropRole(req['session'].sessionId);
  }
}
