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
import { CreateReleaseDto } from './dto/create-release.dto';
import { UpdateReleaseDto } from './dto/update-release.dto';
import { ReleaseService } from './release.service';

@Controller('release')
export class ReleaseController {
  constructor(private readonly releaseService: ReleaseService) {}

  @Post()
  create(@Body() createReleaseDto: CreateReleaseDto) {
    return this.releaseService.create(createReleaseDto);
  }

  @Get()
  findAll(@Query('project') projectId: string) {
    return this.releaseService.findAll(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('finding one------------->>>>>>>>>>>>>');
    return this.releaseService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateReleaseDto: UpdateReleaseDto) {
    return this.releaseService.update(id, updateReleaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.releaseService.remove(id);
  }
}
