import { PartialType } from '@nestjs/mapped-types';

export class CreateInviteDto {
  workspaceId: string;
  invitee: {
    role: string;
    email: string;
  }[];
}

export class UpdateInviteDto extends PartialType(CreateInviteDto) {}
