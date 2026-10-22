'use client';

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import Box from '@mui/material/Box';

import { taskStatusSchema } from '../../api/task-status.schema';

import type { ITaskBoardProps } from './types/task-board-props.types';
import { TaskColumn } from '../task-column/task-column';

export function TaskBoard({
  isMutating,
  tasksByStatus,
  onChangeTaskStatus,
  onCreateTask,
  onOpenTask,
}: ITaskBoardProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor),
  );

  async function handleDragEnd(event: DragEndEvent): Promise<void> {
    if (isMutating || event.over === null || typeof event.active.id !== 'string') {
      return;
    }

    const nextStatus = taskStatusSchema.safeParse(event.over.id);

    if (!nextStatus.success) {
      return;
    }

    const task = [...tasksByStatus.NEW, ...tasksByStatus.IN_PROGRESS, ...tasksByStatus.DONE].find(
      (currentTask) => currentTask.id === event.active.id,
    );

    if (task === undefined || task.status === nextStatus.data) {
      return;
    }

    try {
      await onChangeTaskStatus(task.id, nextStatus.data);
    } catch {
      // Ошибка запроса отображается контейнером доски, где доступно повторное действие.
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(event) => void handleDragEnd(event)}
      sensors={sensors}
    >
      <Box
        aria-label="Доска задач"
        component="section"
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            md: 'repeat(3, minmax(0, 1fr))',
          },
        }}
      >
        <TaskColumn
          isMutating={isMutating}
          onCreateTask={onCreateTask}
          onOpenTask={onOpenTask}
          status="NEW"
          tasks={tasksByStatus.NEW}
          title="Новая"
        />
        <TaskColumn
          isMutating={isMutating}
          onCreateTask={onCreateTask}
          onOpenTask={onOpenTask}
          status="IN_PROGRESS"
          tasks={tasksByStatus.IN_PROGRESS}
          title="В работе"
        />
        <TaskColumn
          isMutating={isMutating}
          onCreateTask={onCreateTask}
          onOpenTask={onOpenTask}
          status="DONE"
          tasks={tasksByStatus.DONE}
          title="Готово"
        />
      </Box>
    </DndContext>
  );
}
