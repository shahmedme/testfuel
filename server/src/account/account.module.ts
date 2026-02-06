import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { WorkspaceModule } from 'workspace/workspace.module';
import { AccountController } from './account.controller';
import { User } from './schemas/user.schema';
import { AuthService, JwtStrategy, UserService } from './services';
import { EmailConfirmationService } from './services/emailConfirmation.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => WorkspaceModule),
  ],
  exports: [UserService],
  controllers: [AccountController],
  providers: [UserService, JwtStrategy, AuthService, EmailConfirmationService],
})
export class AccountModule {}
