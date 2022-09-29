import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from 'account/dto/auth-login.dto';
import { User } from 'account/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: AuthLoginDto) {
    const user = await this.validateUser(email, password);

    if (user?.isActive) {
      const { _id, firstName, lastName, username, email, isBeta } = user;

      return {
        token: this.jwtService.sign({
          _id,
          firstName,
          lastName,
          username,
          email,
          isBeta,
        }),
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<User & { _id: any }> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    }

    return null;
  }
}
