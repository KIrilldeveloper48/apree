import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { IBoardEmptyStateProps } from './types/board-empty-state-props.types';

export function BoardEmptyState({ isCreating, onCreateTask }: IBoardEmptyStateProps) {
  return (
    <Paper component="section" sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
      <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
        <Typography component="h2" variant="h6">
          На доске пока нет задач
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Создайте первую задачу, чтобы начать планирование.
        </Typography>
        <Button disabled={isCreating} onClick={onCreateTask} type="button" variant="contained">
          Создать задачу
        </Button>
      </Stack>
    </Paper>
  );
}
