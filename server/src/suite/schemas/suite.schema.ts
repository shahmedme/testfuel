import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Case } from 'case/schemas/case.schema';
import mongoose from 'mongoose';

export type SuiteDocument = Suite & Document;

@Schema()
export class Suite {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: Case,
    name: Case.name,
    required: true,
  })
  cases: [Case];

  @Prop({ default: Date.now() })
  createdAt: string;
}

export const SuiteSchema = SchemaFactory.createForClass(Suite);

export const SuiteM = { name: Suite.name, schema: SuiteSchema };
