import { useDroppable } from '@dnd-kit/core';
import AddIcon from '@mui/icons-material/Add';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { ITaskColumnProps } from './types/task-column-props.types';
import { TaskCard } from '../task-card/task-card';

export function TaskColumn({
  isMutating,
  onCreateTask,
  title,
  status,
  tasks,
  onOpenTask,
}: ITaskColumnProps) {
  const headingId = `task-column-${title}`;
  const { isOver, setNodeRef } = useDroppable({
    id: status,
    disabled: isMutating,
  });

  return (
    <Paper
      aria-labelledby={headingId}
      component="section"
      elevation={0}
      ref={setNodeRef}
      sx={{
        backgroundColor: isOver ? 'action.hover' : 'background.paper',
        border: 1,
        borderColor: 'divider',
        minHeight: 240,
        p: 2,
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography component="h2" id={headingId} variant="h6">
            {title}
          </Typography>
          <Badge color="primary" showZero badgeContent={tasks.length} />
        </Stack>
        <Stack spacing={1.5}>
          {tasks.map((task) => (
            <TaskCard
              isDragDisabled={isMutating}
              key={task.id}
              onOpenTask={onOpenTask}
              task={task}
            />
          ))}
          <Button
            aria-label={`Создать задачу в колонке «${title}»`}
            disabled={isMutating}
            onClick={() => onCreateTask(status)}
            sx={{
              borderColor: 'divider',
              borderStyle: 'dashed',
              color: 'text.secondary',
              minHeight: 36,
              opacity: 0.65,
              '&:hover': { backgroundColor: 'action.hover', opacity: 1 },
            }}
            type="button"
            variant="outlined"
          >
            <AddIcon />
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
