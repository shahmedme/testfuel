import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Suite } from './schemas/suite.schema';
import { CreateSuiteDto } from './dto/create-suite.dto';
import { UpdateSuiteDto } from './dto/update-suite.dto';

@Injectable()
export class SuiteService {
  constructor(
    @InjectRepository(Suite)
    private suiteRepository: Repository<Suite>,
  ) {}

  create(createSuiteDto: CreateSuiteDto) {
    const suite = this.suiteRepository.create(createSuiteDto);
    return this.suiteRepository.save(suite);
  }

  findAll(projectId: number, includeCases: boolean = false) {
    const options: any = { where: { projectId } };
    if (includeCases) {
      options.relations = ['cases'];
    }
    return this.suiteRepository.find(options);
  }

  findOne(id: number) {
    return this.suiteRepository.findOne({
      where: { id },
      relations: ['cases'],
    });
  }

  async update(id: number, updateSuiteDto: UpdateSuiteDto) {
    await this.suiteRepository.update(id, updateSuiteDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    return await this.suiteRepository.delete(id);
  }

  async findByIds(ids: number[], includeCases: boolean = false) {
    const options: any = { where: { id: In(ids) } };
    if (includeCases) {
      options.relations = ['cases'];
    }
    return await this.suiteRepository.find(options);
  }
}
