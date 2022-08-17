import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from 'account/account.module';
import { CaseModule } from 'case/case.module';
import { ProjectModule } from 'project/project.module';
import { ReleaseModule } from 'release/release.module';
import { SuiteModule } from 'suite/suite.module';
import { WorkspaceModule } from 'workspace/workspace.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_STRING),
    AccountModule,
    ProjectModule,
    WorkspaceModule,
    ReleaseModule,
    SuiteModule,
    CaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
