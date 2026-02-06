import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { CreateInviteDto } from './dto/invite.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspaceService.create(createWorkspaceDto);
  }

  @Get()
  findAll() {
    return this.workspaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.workspaceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.workspaceService.remove(+id);
  }

  @Post('invite/:id')
  invite(@Param('id') id: number, @Body() createInviteDto: CreateInviteDto) {
    return this.workspaceService.invite(id, createInviteDto);
  }
}
