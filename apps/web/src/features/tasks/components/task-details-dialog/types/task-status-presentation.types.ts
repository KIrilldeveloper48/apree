import type { ChipProps } from '@mui/material/Chip';

export type TTaskStatusPresentation = Readonly<{
  label: string;
  color: ChipProps['color'];
}>;
