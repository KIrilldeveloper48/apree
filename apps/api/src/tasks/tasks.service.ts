import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { normalizeTaskText } from './task-text.helpers';
import { createTaskUpdateData } from './task-update-data.helpers';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateTaskDto) {
    if (input.priority === undefined) {
      throw new BadRequestException('Task priority is required.');
    }

    return this.prisma.task.create({
      data: {
        title: normalizeTaskText(input.title),
        description: normalizeTaskText(input.description),
        priority: input.priority,
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (task === null) {
      throw new NotFoundException(`Task ${id} was not found.`);
    }

    return task;
  }

  async update(id: string, input: UpdateTaskDto) {
    await this.findOne(id);

    return this.prisma.task.update({
      where: { id },
      data: createTaskUpdateData(input),
    });
  }

  async updateStatus(id: string, input: UpdateTaskStatusDto) {
    if (input.status === undefined) {
      throw new BadRequestException('Task status is required.');
    }

    await this.findOne(id);

    return this.prisma.task.update({
      where: { id },
      data: {
        status: input.status,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.task.delete({
      where: { id },
    });
  }
}
