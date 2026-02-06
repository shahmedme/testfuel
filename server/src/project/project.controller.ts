import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './schemas/project.schema';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: Partial<Project>) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll(@Query('workspace') workspaceId: number) {
    return this.projectService.findAll(workspaceId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProjectDto: Partial<Project>) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.projectService.remove(id);
  }
}
