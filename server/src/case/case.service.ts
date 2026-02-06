import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Case } from './schemas/case.schema';

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(Case) private caseRepository: Repository<Case>,
  ) {}

  create(createCaseDto: CreateCaseDto) {
    const case_ = this.caseRepository.create(createCaseDto);
    return this.caseRepository.save(case_);
  }

  findAll() {
    return this.caseRepository.find();
  }

  findOne(id: number) {
    return this.caseRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCaseDto: UpdateCaseDto) {
    await this.caseRepository.update(id, updateCaseDto);
    return await this.findOne(id);
  }

  remove(id: number) {
    return this.caseRepository.delete(id);
  }
}
