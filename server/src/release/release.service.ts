import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReleaseDto } from './dto/create-release.dto';
import { UpdateReleaseDto } from './dto/update-release.dto';
import { Release, ReleaseDocument } from './schemas/release.schema';

@Injectable()
export class ReleaseService {
  constructor(
    @InjectModel(Release.name)
    private releaseModel: Model<ReleaseDocument>,
  ) {}

  create(createReleaseDto: CreateReleaseDto) {
    const createdRelease = new this.releaseModel(createReleaseDto);
    return createdRelease.save();
  }

  findAll() {
    return `This action returns all release`;
  }

  findOne(id: number) {
    return `This action returns a #${id} release`;
  }

  update(id: number, updateReleaseDto: UpdateReleaseDto) {
    return `This action updates a #${id} release`;
  }

  remove(id: number) {
    return `This action removes a #${id} release`;
  }
}
