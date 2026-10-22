import Box from '@mui/material/Box';

import type { ITaskBoardProps } from './types/task-board-props.types';
import { TaskColumn } from '../task-column/task-column';

export function TaskBoard({
  isCreating,
  tasksByStatus,
  onCreateTask,
  onOpenTask,
}: ITaskBoardProps) {
  return (
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
        isCreating={isCreating}
        onCreateTask={onCreateTask}
        onOpenTask={onOpenTask}
        status="NEW"
        tasks={tasksByStatus.NEW}
        title="Новая"
      />
      <TaskColumn
        isCreating={isCreating}
        onCreateTask={onCreateTask}
        onOpenTask={onOpenTask}
        status="IN_PROGRESS"
        tasks={tasksByStatus.IN_PROGRESS}
        title="В работе"
      />
      <TaskColumn
        isCreating={isCreating}
        onCreateTask={onCreateTask}
        onOpenTask={onOpenTask}
        status="DONE"
        tasks={tasksByStatus.DONE}
        title="Готово"
      />
    </Box>
  );
}
