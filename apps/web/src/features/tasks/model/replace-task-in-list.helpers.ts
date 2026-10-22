import type { TTask } from '../api/task.types';

export function replaceTaskInList(tasks: readonly TTask[], updatedTask: TTask): readonly TTask[] {
  return tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
}
