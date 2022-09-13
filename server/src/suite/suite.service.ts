import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSuiteDto } from './dto/create-suite.dto';
import { UpdateSuiteDto } from './dto/update-suite.dto';
import { Suite, SuiteDocument } from './schemas/suite.schema';

@Injectable()
export class SuiteService {
  constructor(
    @InjectModel(Suite.name)
    private suiteModel: Model<SuiteDocument>,
  ) {}

  create(createSuiteDto: CreateSuiteDto) {
    const createdSuite = new this.suiteModel(createSuiteDto);
    return createdSuite.save();
  }

  findAll(projectId: string) {
    return this.suiteModel.find({ project: projectId });
  }

  findOne(id: string) {
    return this.suiteModel.findOne({ _id: id });
  }

  async update(_id: string, updateSuiteDto: UpdateSuiteDto) {
    return await this.suiteModel.findOneAndUpdate({ _id }, updateSuiteDto, {
      upsert: true,
      new: true,
    });
  }

  async remove(_id: string): Promise<any> {
    return await this.suiteModel.deleteOne({ _id });
  }

  async findByIds(ids: string[]) {
    return await this.suiteModel.find({ _id: { $in: ids } });
  }
}
