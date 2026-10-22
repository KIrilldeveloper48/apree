import { IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { TaskPriority } from '../../generated/prisma/enums';
import { TASK_DESCRIPTION_MAX_LENGTH, TASK_TITLE_MAX_LENGTH } from '../constants/task.constants';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Подготовить релиз' })
  @IsOptional()
  @IsString()
  @Matches(/\S/, { message: 'Title must contain non-whitespace characters.' })
  @MinLength(1)
  @MaxLength(TASK_TITLE_MAX_LENGTH)
  readonly title?: string;

  @ApiPropertyOptional({ example: 'Проверить API и миграции.' })
  @IsOptional()
  @IsString()
  @Matches(/\S/, { message: 'Description must contain non-whitespace characters.' })
  @MinLength(1)
  @MaxLength(TASK_DESCRIPTION_MAX_LENGTH)
  readonly description?: string;

  @ApiPropertyOptional({ enum: TaskPriority, example: TaskPriority.HIGH })
  @IsOptional()
  @IsEnum(TaskPriority)
  readonly priority?: TaskPriority;
}
