import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'account/schemas/user.schema';
import { UserService } from 'account/services';
import { MemberType } from 'core/models';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { CreateInviteDto } from './dto/invite.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace } from './schemas/workspace.schema';
import { Member } from './schemas/member.schema';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const workspace = this.workspaceRepository.create(createWorkspaceDto);
    return await this.workspaceRepository.save(workspace);
  }

  async findAll(id?: number): Promise<Workspace[]> {
    if (id) {
      return this.workspaceRepository.find({ where: { id } });
    }
    return this.workspaceRepository.find();
  }

  findOne(id: number) {
    return this.workspaceRepository.findOne({
      where: { id },
      relations: ['members', 'members.user'],
    });
  }

  async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    await this.workspaceRepository.update(id, updateWorkspaceDto);
    return await this.findOne(id);
  }

  remove(id: number) {
    return this.workspaceRepository.delete(id);
  }

  getWorkspaces() {
    return 'getting workspaces';
  }

  async getWorkspaceByUser(userId: number) {
    const workspace = await this.workspaceRepository
      .createQueryBuilder('workspace')
      .leftJoinAndSelect('workspace.members', 'member')
      .leftJoinAndSelect('member.user', 'user')
      .where('member.userId = :userId', { userId })
      .getMany();

    return workspace;
  }

  async createForUser(user: User) {
    const name = `${user.firstName}'s Workspace`;
    const description = 'This is default workspace';

    const workspace = this.workspaceRepository.create({
      name,
      description,
      members: [],
      projects: [],
    });

    const savedWorkspace = await this.workspaceRepository.save(workspace);

    const member = this.memberRepository.create({
      role: MemberType.ADMIN,
      userId: user.id,
      workspaceId: savedWorkspace.id,
    });

    await this.memberRepository.save(member);

    return savedWorkspace;
  }

  async invite(workspaceId: number, invitee: CreateInviteDto) {
    const users = await this.userService.getUsersByEmails(
      invitee.invitee.map((member) => member.email),
    );

    const members = users.map((user) =>
      this.memberRepository.create({
        role: MemberType.ADMIN,
        userId: user.id,
        workspaceId,
      }),
    );

    await this.memberRepository.save(members);

    return 'Invites sent successfully';
  }
}
