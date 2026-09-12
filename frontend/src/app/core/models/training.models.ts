import { ClientProfileWithUser, UserProfile } from '@core/models/user.models';

export enum TrainingCycle {
  WEEK = 'WEEK',
  TWO_WEEKS = 'TWO_WEEKS',
  THREE_WEEKS = 'THREE_WEEKS',
  FOUR_WEEKS = 'FOUR_WEEKS',
}

export enum WeekDay {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export enum ExerciseUnit {
  // Weight and resistance
  KG = 'KG',
  LB = 'LB',
  BODYWEIGHT = 'BODYWEIGHT',
  BW_PLUS_KG = 'BW_PLUS_KG',
  BW_MINUS_KG = 'BW_MINUS_KG',
  PERCENT_1RM = 'PERCENT_1RM',
  PLATE = 'PLATE',
  BAND_LEVEL = 'BAND_LEVEL',

  // Reps and structure
  REPS = 'REPS',
  REPS_PER_MIN = 'REPS_PER_MIN',
  ROUND = 'ROUND',
  STATION = 'STATION',
  AMRAP_REPS = 'AMRAP_REPS',

  // Time and pace
  SEC = 'SEC',
  MIN = 'MIN',
  HOUR = 'HOUR',
  WORK_REST_RATIO = 'WORK_REST_RATIO',
  PACE_MIN_KM = 'PACE_MIN_KM',
  PACE_MIN_100M = 'PACE_MIN_100M',
  SPLIT_500M = 'SPLIT_500M',

  // Distance and pool
  METER = 'METER',
  KM = 'KM',
  MILE = 'MILE',
  ELEVATION_M = 'ELEVATION_M',
  FLOOR = 'FLOOR',
  LAP = 'LAP',
  YARD = 'YARD',

  // Energy and physiology
  CAL = 'CAL',
  BPM = 'BPM',
  PULSE_ZONE = 'PULSE_ZONE',
  VO2MAX = 'VO2MAX',
  SPO2 = 'SPO2',

  // Subjective metrics
  RPE = 'RPE',
  RIR = 'RIR',
  PERCENT_EFFORT = 'PERCENT_EFFORT',

  // Specific metrics
  KMH = 'KMH',
  MPH = 'MPH',
  CADENCE = 'CADENCE',
  STROKE = 'STROKE',
  SWOLF = 'SWOLF',
  PULLS = 'PULLS',
  KICKS = 'KICKS',
  LEVEL = 'LEVEL',
  SCORE = 'SCORE',
}

export interface TrainingProgram {
  id: string;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  cycle: TrainingCycle;
  weeks: ProgramWeek[];
  targets: TargetUi[];
  clientProfiles: ClientProfileWithUser[];
}

export interface ProgramWeek {
  workouts: Workout[];
}

export interface ExerciseSet {
  index: number;
  reps: number;
  targetValue: number;
}

export interface Exercise {
  tempId?: string;
  order?: number;
  name: string;
  unit: ExerciseUnit;
  sets: ExerciseSet[];
}

export interface Workout {
  day: WeekDay;
  name: string;
  exercises: Exercise[];
}

export interface Target {
  name: string;
  exerciseTempId: string;
  initialValue: number;
  targetValue: number;
}

export interface TargetUi {
  name: string;
  exercise: {
    id: string;
    name: string;
    unit: ExerciseUnit;
  };
  initialValue: number;
  targetValue: number;
}

export type ClientWorkoutOnDay = UserProfile & {
  plannedWorkout: Workout;
};

export type ExerciseSetRecordUi = {
  id: string;
  exerciseId: string;
  index: number;
  executedReps: number;
  executedValue: number;
  targetReps: number;
  targetValue: number;
  skipped: boolean;
  _wTouched: boolean;
  _rTouched: boolean;
};

export interface ExerciseRecordUi {
  id: string;
  order: number;
  name: string;
  unit: string;
  sets: ExerciseSetRecordUi[];
  skipped: boolean;
}

export interface WorkoutRecordUi {
  name: string;
  day: WeekDay;
  exercises: ExerciseRecordUi[];
  durationSec: number;
  originalWorkoutId: string;
}
