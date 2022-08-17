import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MemberType } from 'core/models';
import mongoose, { Types } from 'mongoose';

// interface MemberEntity {
//   role: string;
//   user: object;
// }

// class User {
//   role: string;
// }

@Schema()
export class Member {
  @Prop({ required: true, enum: MemberType })
  role: MemberType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  user: Types.ObjectId;

  @Prop({ default: Date.now() })
  createdAt?: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
