export interface IBoardErrorAlertProps {
  readonly message: string;
  readonly isRetrying: boolean;
  readonly onRetry: () => Promise<void>;
}
