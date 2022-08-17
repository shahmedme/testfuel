import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type CaseDocument = Case & Document;

export class Case {
  @Prop({ required: true })
  title: string;
}

export const CaseSchema = SchemaFactory.createForClass(Case);

export const CaseM = { name: Case.name, schema: CaseSchema };
