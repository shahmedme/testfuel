import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { WorkspaceModule } from 'workspace/workspace.module';
import { AccountController } from './account.controller';
import { UserSchemaHook } from './schemas/user.schema';
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
    MongooseModule.forFeatureAsync([UserSchemaHook]),
    forwardRef(() => WorkspaceModule),
  ],
  exports: [UserService],
  controllers: [AccountController],
  providers: [UserService, JwtStrategy, AuthService, EmailConfirmationService],
})
export class AccountModule {}
