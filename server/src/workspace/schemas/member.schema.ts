import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'account/schemas/user.schema';
import { MemberType } from 'core/models';
import mongoose from 'mongoose';

@Schema()
export class Member {
  @Prop({ required: true, enum: MemberType })
  role: MemberType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  @Prop({ default: Date.now() })
  createdAt?: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
