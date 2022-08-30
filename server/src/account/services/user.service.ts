import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'account/dto';
import { User, UserDocument } from 'account/schemas/user.schema';
import { Model } from 'mongoose';
import { WorkspaceService } from 'workspace/workspace.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private workspaceService: WorkspaceService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findById(id: number) {
    return await this.userModel.findById(id);
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async getAccount(user: User & { _id: string }) {
    const workspace = await this.workspaceService.getWorkspaceByUser(user._id);
    return { workspace, user };
  }
}
