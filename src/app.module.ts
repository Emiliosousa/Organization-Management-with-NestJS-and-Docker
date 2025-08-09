import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationModule } from './organization/organization.module';
import { SubjectModule } from './subject/subject.module';
import { RoleModule } from './role/role.module';
import { DocumentModule } from './document/document.module';
import { SessionModule } from './session/session.module';
import { Organization } from './organization/entities/organization.entity';
import { Subject } from './subject/entities/subject.entity';
import { Role } from './role/entities/role.entity';
import { Document } from './document/entities/document.entity';
import { Session } from './session/entities/session.entity';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'mariadb',
      port: 3306,
      username: 'secure_access_manager',
      password: 'secure_access_manager_password',
      database: 'sam',
      connectTimeout: 30000,
      autoLoadEntities: true,
      synchronize: true,
      // logging: true,
      // logger: 'advanced-console',
    }),
    OrganizationModule,
    SubjectModule,
    RoleModule,
    DocumentModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {
  /**
   * Here we configure the LoggerMiddleware to be applied to all routes except the ones defined in the exclude method
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'organization', method: RequestMethod.POST },
        { path: 'organization', method: RequestMethod.GET },
        { path: 'session', method: RequestMethod.POST },
        { path: 'document/:fileHandle', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
