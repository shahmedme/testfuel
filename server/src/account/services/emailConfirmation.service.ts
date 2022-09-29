import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'mail/mail.service';
import { UserService } from './user.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  public async sendVerificationLink(user: any) {
    const token = this.jwtService.sign(
      { email: user.email },
      { expiresIn: 21600 },
    );

    return this.mailService.sendUserConfirmation(user, token);
  }

  public async confirmEmail(email: string) {
    const user = await this.userService.findByEmail(email);

    if (user?.isActive) {
      throw new BadRequestException('Email already confirmed');
    }

    // @ts-ignore
    return await this.userService.update(user?._id, { isActive: true });
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('SECRET_KEY'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  public async resendConfirmationLink(userId: string) {
    const user = await this.userService.findById(userId);
    if (user.isActive) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendVerificationLink(user.email);
  }
}
