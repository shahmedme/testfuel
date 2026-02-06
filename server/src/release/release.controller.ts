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
import { ReleaseService } from './release.service';
import { Release } from './schemas/release.schema';

@Controller('release')
export class ReleaseController {
  constructor(private readonly releaseService: ReleaseService) {}

  @Post()
  create(@Body() createReleaseDto: CreateReleaseDto) {
    return this.releaseService.create(createReleaseDto);
  }

  @Get()
  findAll(@Query('project') projectId: number) {
    return this.releaseService.findAll(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.releaseService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateReleaseDto: Partial<Release>) {
    return this.releaseService.update(id, updateReleaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.releaseService.remove(id);
  }
}
