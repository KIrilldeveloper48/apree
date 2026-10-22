import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { TaskStatus } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';

import { createTaskUpdateData } from '../helpers/create-task-update-data.helpers';
import { normalizeTaskText } from '../helpers/normalize-task-text.helpers';
import { CreateTaskDto } from '../schemas/create-task.dto';
import { UpdateTaskDto } from '../schemas/update-task.dto';
import { UpdateTaskStatusDto } from '../schemas/update-task-status.dto';

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
        status: input.status ?? TaskStatus.NEW,
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
