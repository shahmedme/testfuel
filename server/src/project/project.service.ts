import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: Partial<Project>) {
    const project = this.projectRepository.create(createProjectDto);
    return await this.projectRepository.save(project);
  }

  async findAll(workspaceId: number) {
    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.suites', 'suite')
      .leftJoinAndSelect('suite.cases', 'case')
      .where('project.workspaceId = :workspaceId', { workspaceId })
      .orderBy('project.createdAt', 'DESC')
      .getMany();

    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      isActive: project.isActive,
      workspace: project.workspace,
      createdAt: project.createdAt,
      suitesCount: project.suites?.length || 0,
      testCasesCount:
        project.suites?.reduce(
          (total, suite) => total + (suite.cases?.length || 0),
          0,
        ) || 0,
    }));
  }

  async findOne(id: number) {
    return await this.projectRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProjectDto: Partial<Project>) {
    await this.projectRepository.update(id, updateProjectDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    return await this.projectRepository.delete(id);
  }
}
