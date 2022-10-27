import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'account/schemas/user.schema';
import { UserService } from 'account/services';
import { MemberType } from 'core/models';
import { Model, Types } from 'mongoose';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { CreateInviteDto } from './dto/invite.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace, WorkspaceDocument } from './schemas/workspace.schema';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const createdWorkspace = new this.workspaceModel(createWorkspaceDto);
    return createdWorkspace.save();
  }

  async findAll(_id?: string): Promise<Workspace[]> {
    if (_id) {
      return this.workspaceModel.find({ _id }).exec();
    }
    return this.workspaceModel.find().exec();
  }

  findOne(_id: string) {
    return this.workspaceModel.findOne({ _id }).populate('members.user');
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

  async createForUser(user: User & { _id: any }) {
    const name = `${user.firstName}'s Workspace`;
    const description = 'This is default workspace';
    const members = [
      {
        role: MemberType.ADMIN,
        user: user._id,
      },
    ];

    return this.create({ name, description, members, projects: [] });
  }

  // async createProject(workspaceId: string, project: Project) {
  //   const _workspace = await this.workspaceModel.findOne({ _id: workspaceId });
  //   _workspace.projects.push(project);

  //   const updated = await _workspace.save();
  //   console.log('🚀 ~ file: ~ createProject ~ updated', updated);

  //   return updated;
  // }

  async invite(workspaceId: string, invitee: CreateInviteDto) {
    const users = await this.userService.getUsersByEmails(
      invitee.invitee.map((member) => member.email),
    );

    await this.workspaceModel.updateOne(
      { _id: workspaceId },
      {
        $push: {
          members: {
            $each: users.map((user) => ({ role: 'ADMIN', user: user._id })),
          },
        },
      },
    );

    return 'hello world';
  }
}
