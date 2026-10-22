import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { TaskPriority, TaskStatus } from '../../generated/prisma/enums';
import { configureApiApplication } from '../../config/configure-api-application.helpers';
import { TasksController } from '../tasks.controller';
import { TasksService } from '../tasks.service';

describe('TasksController', () => {
  let app: INestApplication;

  const tasksService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    updateStatus: vi.fn(),
    remove: vi.fn(),
  };

  const taskId = 'fb21a1a7-7a96-4b61-a5cc-a2f174f4c5de';
  const task = {
    id: taskId,
    title: 'Подготовить релиз',
    description: 'Проверить API и миграции.',
    priority: TaskPriority.HIGH,
    status: TaskStatus.IN_PROGRESS,
    createdAt: new Date('2026-10-22T12:00:00.000Z'),
    updatedAt: new Date('2026-10-22T12:00:00.000Z'),
  };

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    })
      .overrideProvider(TasksService)
      .useValue(tasksService)
      .compile();

    app = testingModule.createNestApplication();
    configureApiApplication(app);
    await app.init();
  });

  afterEach(async () => {
    vi.clearAllMocks();
    await app.close();
  });

  it('creates a valid task through the API', async () => {
    tasksService.create.mockResolvedValue(task);

    const response = await request(app.getHttpServer())
      .post('/api/tasks')
      .send({
        title: 'Подготовить релиз',
        description: 'Проверить API и миграции.',
        priority: TaskPriority.HIGH,
        status: TaskStatus.IN_PROGRESS,
      })
      .expect(201);

    expect(response.body).toMatchObject({
      id: taskId,
      status: TaskStatus.IN_PROGRESS,
    });
    expect(tasksService.create).toHaveBeenCalledWith({
      title: 'Подготовить релиз',
      description: 'Проверить API и миграции.',
      priority: TaskPriority.HIGH,
      status: TaskStatus.IN_PROGRESS,
    });
  });

  it('rejects a task with whitespace-only title before calling the service', async () => {
    await request(app.getHttpServer())
      .post('/api/tasks')
      .send({
        title: '   ',
        description: 'Описание задачи',
        priority: TaskPriority.LOW,
      })
      .expect(400);

    expect(tasksService.create).not.toHaveBeenCalled();
  });

  it('moves a task through the dedicated status endpoint', async () => {
    tasksService.updateStatus.mockResolvedValue({
      ...task,
      status: TaskStatus.DONE,
    });

    const response = await request(app.getHttpServer())
      .patch(`/api/tasks/${taskId}/status`)
      .send({ status: TaskStatus.DONE })
      .expect(200);

    expect(response.body.status).toBe(TaskStatus.DONE);
    expect(tasksService.updateStatus).toHaveBeenCalledWith(taskId, {
      status: TaskStatus.DONE,
    });
  });
});
