import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from 'account/dto';
import { User, UserDocument } from 'account/schemas/user.schema';
import { Model } from 'mongoose';
import { WorkspaceService } from 'workspace/workspace.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => WorkspaceService))
    private workspaceService: WorkspaceService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async getAccount(_user: User & { _id: string }) {
    const workspace = await this.workspaceService.getWorkspaceByUser(_user._id);
    const user = await this.findById(_user._id);
    return { workspace, user };
  }

  async getUsersByEmails(emails: string[]) {
    const users = await this.userModel.find({ email: { $in: emails } });
    return users;
  }

  async update(_id: string, UpdateUserDto: UpdateUserDto) {
    return await this.userModel.findOneAndUpdate({ _id }, UpdateUserDto, {
      upsert: true,
      new: true,
    });
  }
}
