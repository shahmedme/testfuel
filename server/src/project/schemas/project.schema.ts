import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Release } from 'release/schemas/release.schema';
import { Suite } from 'suite/schemas/suite.schema';
import { Workspace } from 'workspace/schemas/workspace.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Release.name,
  })
  releases?: Release[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Suite.name,
  })
  suites?: Suite[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Workspace.name,
    required: true,
  })
  workspace: Workspace;

  @Prop({ default: Date.now() })
  createdAt?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

export const ProjectM = { name: Project.name, schema: ProjectSchema };
