import type { TTasksByStatus } from '../model/tasks-by-status.types';

export interface ITaskBoardProps {
  readonly tasksByStatus: TTasksByStatus;
}
