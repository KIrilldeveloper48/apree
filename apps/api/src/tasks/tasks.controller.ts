import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  create(@Body() input: CreateTaskDto) {
    return this.tasksService.create(input);
  }

  @Get()
  @ApiOperation({ summary: 'List tasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task fields' })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() input: UpdateTaskDto) {
    return this.tasksService.update(id, input);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Move a task to another status' })
  updateStatus(@Param('id', new ParseUUIDPipe()) id: string, @Body() input: UpdateTaskStatusDto) {
    return this.tasksService.updateStatus(id, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiNoContentResponse({ description: 'Task deleted' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.tasksService.remove(id);
  }
}
