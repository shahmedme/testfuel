import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuiteService } from 'suite/suite.service';
import { CreateReleaseDto } from './dto/create-release.dto';
import { UpdateReleaseDto } from './dto/update-release.dto';
import { Release, ReleaseDocument } from './schemas/release.schema';

@Injectable()
export class ReleaseService {
  constructor(
    @InjectModel(Release.name)
    private releaseModel: Model<ReleaseDocument>,
    private suiteService: SuiteService,
  ) {}

  async create(createReleaseDto: CreateReleaseDto) {
    const suites = await this.suiteService.findByIds(createReleaseDto.suites);

    const createdRelease = new this.releaseModel({
      ...createReleaseDto,
      suites,
    });
    return createdRelease.save();
  }

  findAll(projectId: string) {
    return this.releaseModel.find({ project: projectId });
  }

  findOne(id: string) {
    return this.releaseModel.findOne({ _id: id });
  }

  async update(_id: string, updateReleaseDto: UpdateReleaseDto) {
    return await this.releaseModel.findOneAndUpdate({ _id }, updateReleaseDto, {
      upsert: true,
      new: true,
    });
  }

  async remove(_id: string): Promise<any> {
    return await this.releaseModel.deleteOne({ _id });
  }
}
