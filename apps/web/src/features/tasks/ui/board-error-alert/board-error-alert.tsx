import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import type { IBoardErrorAlertProps } from './types/board-error-alert-props.types';

export function BoardErrorAlert({ message, isRetrying, onRetry }: IBoardErrorAlertProps) {
  return (
    <Alert
      action={
        <Button
          color="inherit"
          disabled={isRetrying}
          onClick={() => void onRetry()}
          size="small"
          type="button"
        >
          Повторить
        </Button>
      }
      severity="error"
    >
      {message}
    </Alert>
  );
}
