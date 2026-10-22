import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { TaskStatus } from '../../generated/prisma/enums';

export class UpdateTaskStatusDto {
  @ApiProperty({ enum: TaskStatus, example: TaskStatus.IN_PROGRESS })
  @IsEnum(TaskStatus)
  readonly status: TaskStatus | undefined = undefined;
}
