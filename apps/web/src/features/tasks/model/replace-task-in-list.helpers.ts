import type { TTask } from '../api/types/task.types';

export function replaceTaskInList(tasks: readonly TTask[], updatedTask: TTask): readonly TTask[] {
  return tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
}
