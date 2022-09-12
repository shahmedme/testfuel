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
import { CreateSuiteDto } from './dto/create-suite.dto';
import { UpdateSuiteDto } from './dto/update-suite.dto';
import { SuiteService } from './suite.service';

@Controller('suite')
export class SuiteController {
  constructor(private readonly suiteService: SuiteService) {}

  @Post()
  create(@Body() createSuiteDto: CreateSuiteDto) {
    return this.suiteService.create(createSuiteDto);
  }

  @Get()
  findAll(@Query('project') projectId: string) {
    return this.suiteService.findAll(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suiteService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSuiteDto: UpdateSuiteDto) {
    return this.suiteService.update(id, updateSuiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suiteService.remove(id);
  }
}
