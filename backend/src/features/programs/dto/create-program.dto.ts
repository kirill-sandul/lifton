import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Cycle } from '../../../generated/prisma/enums';
import { Type } from 'class-transformer';

enum WeekDay {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

export class CreateTargetDto {
  @IsString()
  name: string;

  @IsString()
  unit: string;

  @Type(() => Number)
  @IsNumber()
  initialValue: number;

  @Type(() => Number)
  @IsNumber()
  targetValue: number;
}

export class CreateExerciseSetDto {
  @IsNumber()
  reps: number;

  @IsNumber()
  targetValue: number;
}

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsString()
  unit: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseSetDto)
  sets: CreateExerciseSetDto[];
}

export class CreateWorkoutDto {
  @IsString()
  name: string;

  @IsEnum(WeekDay)
  day: WeekDay;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseDto)
  exercises: CreateExerciseDto[];
}

export class CreateWeekDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutDto)
  workouts: CreateWorkoutDto[];
}

export class CreateProgramDto {
  @IsString()
  name: string;

  @IsEnum(Cycle)
  cycle: Cycle;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWeekDto)
  weeks: CreateWeekDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTargetDto)
  targets: CreateTargetDto[];
}
