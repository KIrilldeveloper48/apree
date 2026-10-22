import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { getTaskPriorityPresentation } from './get-task-priority-presentation.helpers';
import type { ITaskCardProps } from './task-card-props.types';

export function TaskCard({ task }: ITaskCardProps) {
  const priority = getTaskPriorityPresentation(task.priority);

  return (
    <Card component="article" variant="outlined">
      <CardContent>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
          >
            <Typography component="h3" variant="subtitle1">
              {task.title}
            </Typography>
            <Chip color={priority.color} label={priority.label} size="small" />
          </Stack>
          <Typography color="text.secondary" variant="body2">
            {task.description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
