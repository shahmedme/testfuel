import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import {
  Workspace,
  WorkspaceM,
  WorkspaceSchema,
} from 'workspace/schemas/workspace.schema';
import { WorkspaceService } from 'workspace/workspace.service';
import { AccountController } from './account.controller';
import { UserSchemaHook } from './schemas/user.schema';
import { AuthService, JwtStrategy, UserService } from './services';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.SECRET_KEY,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
    MongooseModule.forFeatureAsync([UserSchemaHook]),
  ],
  controllers: [AccountController],
  providers: [UserService, JwtStrategy, AuthService, WorkspaceService],
})
export class AccountModule {}
