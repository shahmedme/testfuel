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

  findAll() {
    return this.suiteModel.find({});
  }

  findOne(id: string) {
    return this.suiteModel.findOne({ _id: id });
  }

  update(id: number, updateSuiteDto: UpdateSuiteDto) {
    return `This action updates a #${id} suite`;
  }

  remove(id: number) {
    return `This action removes a #${id} suite`;
  }
}
