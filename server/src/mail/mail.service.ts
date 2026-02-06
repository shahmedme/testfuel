import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'account/schemas/user.schema';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserConfirmation(user: Partial<User>, token: string) {
    const url = `${this.configService.get(
      'CLIENT_URL',
    )}/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Testfuel" <shakil.hv@gmail.com>',
      subject: 'Welcome to Testfuel. Confirm your Email',
      template: './confirmation',
      context: {
        name: user.firstName + ' ' + user.lastName,
        url,
      },
    });
  }
}
