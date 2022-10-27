import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'mail/mail.service';
import { WorkspaceService } from 'workspace/workspace.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from './services';
import { AuthService } from './services/auth.service';
import { EmailConfirmationService } from './services/emailConfirmation.service';

@Controller('users')
export class AccountController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly workspaceService: WorkspaceService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser(@Request() req) {
    return this.userService.getAccount(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Request() req, @Body() updateProjectDto: UpdateUserDto) {
    return this.userService.update(req.user._id, updateProjectDto);
  }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    await this.workspaceService.createForUser(user);
    this.emailConfirmationService.sendVerificationLink(user);
    return user;
  }

  @Get('send-mail')
  async sendConfirmationEmail() {
    const user = { name: 'Shakil Ahmed', email: 'shakilahmed6055@gmail.com' };
    const token = this.jwtService.sign(
      { email: user.email },
      { expiresIn: 21600 },
    );

    return this.mailService.sendUserConfirmation(user, token);
  }

  @Get('confirm')
  async confirm(@Query('token') token: string) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      token,
    );

    return await this.emailConfirmationService.confirmEmail(email);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post('signin')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('resend-confirmation-link')
  @UseGuards(JwtAuthGuard)
  async resendConfirmationLink(@Req() request: any) {
    await this.emailConfirmationService.resendConfirmationLink(request.user.id);
  }
}
