import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceM } from 'workspace/schemas/workspace.schema';
import { WorkspaceService } from 'workspace/workspace.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectM } from './schemas/project.schema';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, WorkspaceService],
  imports: [
    MongooseModule.forFeature([ProjectM]),
    MongooseModule.forFeature([WorkspaceM]),
  ],
})
export class ProjectModule {}
