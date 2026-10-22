import Box from '@mui/material/Box';

import type { ITaskBoardProps } from './types/task-board-props.types';
import { TaskColumn } from '../task-column/task-column';

export function TaskBoard({ tasksByStatus, onOpenTask }: ITaskBoardProps) {
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
      <TaskColumn onOpenTask={onOpenTask} tasks={tasksByStatus.NEW} title="Новая" />
      <TaskColumn onOpenTask={onOpenTask} tasks={tasksByStatus.IN_PROGRESS} title="В работе" />
      <TaskColumn onOpenTask={onOpenTask} tasks={tasksByStatus.DONE} title="Готово" />
    </Box>
  );
}
