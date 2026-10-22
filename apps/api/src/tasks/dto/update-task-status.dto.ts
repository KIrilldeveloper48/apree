import { IsEnum } from 'class-validator';

import { TaskStatus } from '../../generated/prisma/enums';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  readonly status: TaskStatus | undefined = undefined;
}
