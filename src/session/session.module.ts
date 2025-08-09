import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { SubjectModule } from '../subject/subject.module';

@Module({
  controllers: [SessionController],
  providers: [SessionService],
  imports: [TypeOrmModule.forFeature([Session]), SubjectModule],
  exports: [SessionService],
})
export class SessionModule {}
