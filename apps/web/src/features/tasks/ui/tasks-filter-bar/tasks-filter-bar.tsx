import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { taskPrioritySchema } from '../../api/schemas/task-priority.schema';

import type { ITasksFilterBarProps } from './types/tasks-filter-bar-props.types';

export function TasksFilterBar({
  isFiltering,
  onClear,
  onPriorityChange,
  onSearchQueryChange,
  priority,
  searchQuery,
}: ITasksFilterBarProps) {
  function handlePriorityChange(event: SelectChangeEvent): void {
    if (event.target.value === '') {
      onPriorityChange(null);
      return;
    }

    const parsedPriority = taskPrioritySchema.safeParse(event.target.value);

    if (parsedPriority.success) {
      onPriorityChange(parsedPriority.data);
    }
  }

  return (
    <Stack
      aria-label="Поиск и фильтрация задач"
      component="section"
      direction={{ xs: 'column', md: 'row' }}
      spacing={1.5}
    >
      <TextField
        fullWidth
        label="Поиск по названию"
        onChange={(event) => onSearchQueryChange(event.target.value)}
        slotProps={{ htmlInput: { maxLength: 200 } }}
        type="search"
        value={searchQuery}
      />
      <FormControl sx={{ minWidth: { md: 196 } }}>
        <InputLabel id="task-filter-priority-label">Приоритет</InputLabel>
        <Select
          label="Приоритет"
          labelId="task-filter-priority-label"
          onChange={handlePriorityChange}
          value={priority ?? ''}
        >
          <MenuItem value="">Все приоритеты</MenuItem>
          <MenuItem value="LOW">Низкий</MenuItem>
          <MenuItem value="MEDIUM">Средний</MenuItem>
          <MenuItem value="HIGH">Высокий</MenuItem>
        </Select>
      </FormControl>
      <Button disabled={!isFiltering} onClick={onClear} type="button" variant="outlined">
        Очистить
      </Button>
    </Stack>
  );
}
