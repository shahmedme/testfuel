import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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
    const projectsWithCounts = await this.projectModel.aggregate([
      { $match: { workspace: new mongoose.Types.ObjectId(workspaceId) } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: 'suites',
          localField: '_id',
          foreignField: 'project',
          as: 'suites',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          description: { $first: '$description' },
          isActive: { $first: '$isActive' },
          workspace: { $first: '$workspace' },
          createdAt: { $first: '$createdAt' },
          suitesCount: { $sum: { $size: '$suites' } },
          testCasesCount: {
            $sum: {
              $size: {
                $reduce: {
                  input: '$suites',
                  initialValue: [],
                  in: { $concatArrays: ['$$value', '$$this.cases'] },
                },
              },
            },
          },
        },
      },
    ]);

    return projectsWithCounts;
  }

  async findOne(_id: string) {
    return await this.projectModel.findOne({ _id });
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
