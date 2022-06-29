import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SuiteService } from './suite.service';
import { CreateSuiteDto } from './dto/create-suite.dto';
import { UpdateSuiteDto } from './dto/update-suite.dto';

@Controller('suite')
export class SuiteController {
  constructor(private readonly suiteService: SuiteService) {}

  @Post()
  create(@Body() createSuiteDto: CreateSuiteDto) {
    return this.suiteService.create(createSuiteDto);
  }

  @Get()
  findAll() {
    return this.suiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suiteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuiteDto: UpdateSuiteDto) {
    return this.suiteService.update(+id, updateSuiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suiteService.remove(+id);
  }
}
