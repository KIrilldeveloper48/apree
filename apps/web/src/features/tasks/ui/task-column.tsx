import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { ITaskColumnProps } from './task-column-props.types';
import { TaskCard } from './task-card';

export function TaskColumn({ title, tasks, onOpenTask }: ITaskColumnProps) {
  const headingId = `task-column-${title}`;

  return (
    <Paper
      aria-labelledby={headingId}
      component="section"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
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
            <TaskCard key={task.id} onOpenTask={onOpenTask} task={task} />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}
