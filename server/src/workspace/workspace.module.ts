import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceM } from './schemas/workspace.schema';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [MongooseModule.forFeature([WorkspaceM])],
  // exports: [MongooseModule.forFeature([WorkspaceM])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}
