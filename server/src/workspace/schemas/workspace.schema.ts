import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MemberType } from 'core/models';
import { ObjectId, Types } from 'mongoose';
import { Member } from './member.schema';

export type WorkspaceDocument = Workspace & Document;

@Schema()
class MemberSchema extends Member {
  @Prop({ required: true })
  role: MemberType;

  @Prop({ required: true })
  user: Types.ObjectId;
}

@Schema()
export class Workspace {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    type: Types.Array,
    schema: MemberSchema,
    required: true,
  })
  members: Member[];

  @Prop({ default: Date.now() })
  createdAt: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);

export const WorkspaceM = { name: Workspace.name, schema: WorkspaceSchema };
