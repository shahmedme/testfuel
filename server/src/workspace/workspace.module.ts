import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from 'account/account.module';
import { WorkspaceSchema } from './schemas/workspace.schema';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Workspace', schema: WorkspaceSchema }]),
    forwardRef(() => AccountModule),
  ],
  exports: [WorkspaceService],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}
