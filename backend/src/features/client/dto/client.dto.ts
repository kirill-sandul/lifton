import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { WorkoutDay } from '../../../generated/prisma/enums';

export class ExerciseSetRecord {
  @Type(() => Number)
  @IsNumber()
  index: number;

  @Type(() => Number)
  @IsNumber()
  targetReps: number;

  @Type(() => Number)
  @IsNumber()
  targetValue: number;

  @Type(() => Number)
  @IsNumber()
  executedReps: number;

  @Type(() => Number)
  @IsNumber()
  executedValue: number;

  @IsBoolean()
  skipped: boolean;
}

export class WorkoutExerciseRecord {
  @IsString()
  name: string;

  @IsString()
  unit: string;

  @Type(() => Number)
  @IsNumber()
  order: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseSetRecord)
  sets: ExerciseSetRecord[];
}

export class WorkoutSessionRecordDto {
  @IsString()
  name: string;

  @IsEnum(WorkoutDay)
  day: WorkoutDay;

  @Type(() => Number)
  @IsNumber()
  durationSec: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutExerciseRecord)
  exercises: WorkoutExerciseRecord[];

  @IsString()
  originalWorkoutId: string;
}

export class SkipWorkoutDto {
  @ValidateIf((o) => o.skipReason !== null && o.skipReason !== undefined)
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  skipReason: string | null;
}
