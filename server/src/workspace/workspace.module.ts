import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'account/account.module';
import { Workspace } from './schemas/workspace.schema';
import { Member } from './schemas/member.schema';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace, Member]),
    forwardRef(() => AccountModule),
  ],
  exports: [WorkspaceService],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}
