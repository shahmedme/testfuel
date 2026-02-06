import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateUserDto } from 'account/dto';
import { User } from 'account/schemas/user.schema';
import { WorkspaceService } from 'workspace/workspace.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(forwardRef(() => WorkspaceService))
    private workspaceService: WorkspaceService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getAccount(user: User) {
    const workspace = await this.workspaceService.getWorkspaceByUser(user.id);
    const userData = await this.findById(user.id);
    return { workspace, user: userData };
  }

  async getUsersByEmails(emails: string[]) {
    const users = await this.userRepository.find({
      where: { email: In(emails) },
    });
    return users;
  }

  async update(id: number, updateUserDto: Partial<User>) {
    await this.userRepository.update(id, updateUserDto);
    return await this.findById(id);
  }
}
