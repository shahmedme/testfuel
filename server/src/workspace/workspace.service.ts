import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'account/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace, WorkspaceDocument } from './schemas/workspace.schema';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const createdWorkspace = new this.workspaceModel(createWorkspaceDto);
    return createdWorkspace.save();
  }

  async findAll(): Promise<Workspace[]> {
    return this.workspaceModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} workspace`;
  }

  async update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    return `This action updates a #${id} workspace with ${updateWorkspaceDto} dto`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`;
  }

  getWorkspaces() {
    return 'getting workspaces';
  }

  async getWorkspaceByUser(userId: string) {
    const workspace = await this.workspaceModel.find({
      'members.user': new Types.ObjectId(userId),
    });

    return workspace;
  }

  // async createProject(workspaceId: string, project: Project) {
  //   const _workspace = await this.workspaceModel.findOne({ _id: workspaceId });
  //   _workspace.projects.push(project);

  //   const updated = await _workspace.save();
  //   console.log('🚀 ~ file: ~ createProject ~ updated', updated);

  //   return updated;
  // }
}
