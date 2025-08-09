import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt/dist';
import { SessionService } from './session/session.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly reflector: Reflector,
    private readonly sessionService: SessionService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    try {
      req['session'] = await this.sessionService.getSession(token);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
    next();
  }
}
