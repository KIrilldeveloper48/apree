import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { TTasksByStatus } from '../features/tasks/model/tasks-by-status.types';
import { TaskBoard } from '../features/tasks/ui/task-board';

const emptyTasksByStatus = {
  NEW: [],
  IN_PROGRESS: [],
  DONE: [],
} satisfies TTasksByStatus;

export default function Home() {
  return (
    <main>
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={3}>
          <Stack spacing={0.5}>
            <Typography component="h1" variant="h4">
              Задачник
            </Typography>
            <Typography color="text.secondary" variant="body1">
              Планируйте задачи и отслеживайте их выполнение.
            </Typography>
          </Stack>
          <TaskBoard tasksByStatus={emptyTasksByStatus} />
        </Stack>
      </Container>
    </main>
  );
}
