import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Project } from 'project/schemas/project.schema';
import { Suite } from 'suite/schemas/suite.schema';

export type ReleaseDocument = Release & Document;

@Schema()
export class Release {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: Suite.name,
    required: true,
  })
  suites: [Suite];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  })
  project: Project;

  @Prop({ default: Date.now() })
  createdAt: string;
}

export const ReleaseSchema = SchemaFactory.createForClass(Release);

export const ReleaseM = { name: Release.name, schema: ReleaseSchema };
