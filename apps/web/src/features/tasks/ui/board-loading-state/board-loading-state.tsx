import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export function BoardLoadingState() {
  return (
    <Box aria-live="polite" sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
      <CircularProgress aria-label="Загрузка задач" />
    </Box>
  );
}
