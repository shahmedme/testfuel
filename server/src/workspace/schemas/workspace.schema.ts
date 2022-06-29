import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Member } from './member.schema';

export type WorkspaceDocument = Workspace & Document;

@Schema()
export class Workspace {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  members: Member[];

  @Prop({ default: Date.now() })
  createdAt: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);

export const WorkspaceM = { name: Workspace.name, schema: WorkspaceSchema };
