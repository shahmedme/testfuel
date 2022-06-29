import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from 'account/dto/auth-login.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    return {
      access_token: this.jwtService.sign({
        userId: user.id,
      }),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<any> {
    const { email, password } = authLoginDto;

    const user = await this.userService.findByEmail(email);

    // if (!(await user?.validatePassword(password))) {
    //   throw new UnauthorizedException();
    // }

    return user;
  }
}
