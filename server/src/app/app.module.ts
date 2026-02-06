import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'account/account.module';
import { CaseModule } from 'case/case.module';
import { MailModule } from 'mail/mail.module';
import { ProjectModule } from 'project/project.module';
import { ReleaseModule } from 'release/release.module';
import { SuiteModule } from 'suite/suite.module';
import { WorkspaceModule } from 'workspace/workspace.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from 'account/schemas/user.schema';
import { Workspace } from 'workspace/schemas/workspace.schema';
import { Member } from 'workspace/schemas/member.schema';
import { Project } from 'project/schemas/project.schema';
import { Release } from 'release/schemas/release.schema';
import { Suite } from 'suite/schemas/suite.schema';
import { Case } from 'case/schemas/case.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'testfuel',
      entities: [User, Workspace, Member, Project, Release, Suite, Case],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    AccountModule,
    ProjectModule,
    WorkspaceModule,
    ReleaseModule,
    SuiteModule,
    CaseModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
