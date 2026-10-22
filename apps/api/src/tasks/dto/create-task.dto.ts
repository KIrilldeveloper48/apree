import { IsEnum, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { TaskPriority } from '../../generated/prisma/enums';
import { TASK_DESCRIPTION_MAX_LENGTH, TASK_TITLE_MAX_LENGTH } from '../task.constants';

export class CreateTaskDto {
  @ApiProperty({ example: 'Подготовить релиз' })
  @IsString()
  @Matches(/\S/, { message: 'Title must contain non-whitespace characters.' })
  @MinLength(1)
  @MaxLength(TASK_TITLE_MAX_LENGTH)
  readonly title = '';

  @ApiProperty({ example: 'Проверить API и миграции.' })
  @IsString()
  @Matches(/\S/, { message: 'Description must contain non-whitespace characters.' })
  @MinLength(1)
  @MaxLength(TASK_DESCRIPTION_MAX_LENGTH)
  readonly description = '';

  @ApiProperty({ enum: TaskPriority, example: TaskPriority.HIGH })
  @IsEnum(TaskPriority)
  readonly priority: TaskPriority | undefined = undefined;
}
