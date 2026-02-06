import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuiteService } from 'suite/suite.service';
import { CreateReleaseDto } from './dto/create-release.dto';
import { UpdateReleaseDto } from './dto/update-release.dto';
import { Release } from './schemas/release.schema';

@Injectable()
export class ReleaseService {
  constructor(
    @InjectRepository(Release)
    private releaseRepository: Repository<Release>,
    private suiteService: SuiteService,
  ) {}

  async create(createReleaseDto: CreateReleaseDto) {
    const suites = await this.suiteService.findByIds(createReleaseDto.suites);

    const release = this.releaseRepository.create({
      title: createReleaseDto.title,
      projectId: createReleaseDto.project,
      suites: suites.map((suite) => suite.id),
    });
    return await this.releaseRepository.save(release);
  }

  findAll(projectId: number) {
    return this.releaseRepository.find({ where: { projectId } });
  }

  findOne(id: number) {
    return this.releaseRepository.findOne({ where: { id } });
  }

  async update(id: number, updateReleaseDto: Partial<Release>) {
    await this.releaseRepository.update(id, updateReleaseDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    return await this.releaseRepository.delete(id);
  }
}
