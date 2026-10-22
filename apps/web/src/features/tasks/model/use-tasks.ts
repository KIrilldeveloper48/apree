'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  createTask,
  deleteTask,
  listTasks,
  updateTask,
  updateTaskStatus,
} from '../api/services/tasks-api';
import type { TCreateTaskInput } from '../api/types/create-task-input.types';
import type { TTask } from '../api/types/task.types';
import type { TUpdateTaskInput } from '../api/types/update-task-input.types';
import type { TUpdateTaskStatusInput } from '../api/types/update-task-status-input.types';

import { getErrorMessage } from './get-error-message.helpers';
import { groupTasksByStatus } from './group-tasks-by-status.helpers';
import { replaceTaskInList } from './replace-task-in-list.helpers';
import type { TUseTasksResult } from './use-tasks-result.types';

export function useTasks(): TUseTasksResult {
  const [tasks, setTasks] = useState<readonly TTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const reload = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      setTasks(await listTasks());
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCurrent = true;

    async function loadInitialTasks(): Promise<void> {
      try {
        const loadedTasks = await listTasks();

        if (isCurrent) {
          setTasks(loadedTasks);
        }
      } catch (error: unknown) {
        if (isCurrent) {
          setErrorMessage(getErrorMessage(error));
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialTasks();

    return () => {
      isCurrent = false;
    };
  }, []);

  const create = useCallback(async (input: TCreateTaskInput): Promise<TTask> => {
    setIsMutating(true);
    setErrorMessage(null);

    try {
      const task = await createTask(input);

      setTasks((currentTasks) => [task, ...currentTasks]);

      return task;
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
      throw error;
    } finally {
      setIsMutating(false);
    }
  }, []);

  const update = useCallback(async (taskId: string, input: TUpdateTaskInput): Promise<TTask> => {
    setIsMutating(true);
    setErrorMessage(null);

    try {
      const task = await updateTask(taskId, input);

      setTasks((currentTasks) => replaceTaskInList(currentTasks, task));

      return task;
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
      throw error;
    } finally {
      setIsMutating(false);
    }
  }, []);

  const updateStatus = useCallback(
    async (taskId: string, input: TUpdateTaskStatusInput): Promise<TTask> => {
      setIsMutating(true);
      setErrorMessage(null);

      try {
        const task = await updateTaskStatus(taskId, input);

        setTasks((currentTasks) => replaceTaskInList(currentTasks, task));

        return task;
      } catch (error: unknown) {
        setErrorMessage(getErrorMessage(error));
        throw error;
      } finally {
        setIsMutating(false);
      }
    },
    [],
  );

  const remove = useCallback(async (taskId: string): Promise<void> => {
    setIsMutating(true);
    setErrorMessage(null);

    try {
      await deleteTask(taskId);

      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
      throw error;
    } finally {
      setIsMutating(false);
    }
  }, []);

  const tasksByStatus = useMemo(() => groupTasksByStatus(tasks), [tasks]);

  return {
    tasks,
    tasksByStatus,
    isLoading,
    isMutating,
    errorMessage,
    reload,
    create,
    update,
    updateStatus,
    remove,
  };
}
