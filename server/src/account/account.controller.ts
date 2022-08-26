import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MemberType } from 'core/models';
import { WorkspaceService } from 'workspace/workspace.service';
import { CreateUserDto } from './dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from './services';
import { AuthService } from './services/auth.service';

@Controller('users')
export class AccountController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly workspaceService: WorkspaceService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser(@Request() req) {
    return this.userService.getAccount(req.user);
  }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.create(createUserDto);

    await this.workspaceService.create({
      name: `${createdUser.firstName}'s Workspace`,
      description: 'This is default workspace',
      members: [
        {
          role: MemberType.ADMIN,
          user: createdUser._id,
        },
      ],
      projects: [],
    });

    return createdUser;
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Post('signin')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }
}
