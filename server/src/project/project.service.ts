import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findAll(workspaceId: string) {
    return this.projectModel.find({ workspace: workspaceId });
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async update(_id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectModel.findOneAndUpdate({ _id }, updateProjectDto, {
      upsert: true,
      new: true,
    });
  }

  async remove(_id: string): Promise<any> {
    return await this.projectModel.deleteOne({ _id });
  }
}
