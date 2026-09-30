import { Prisma, ClientProfile } from '../../generated/prisma/client';
import { WORKOUT_ARGS, WorkoutWithDate } from '../../core/models/global.models';

const currentProgramArgs = {
  include: {
    weeks: {
      include: {
        workouts: WORKOUT_ARGS,
      },
    },
    targets: {
      include: {
        exercises: true,
      },
    },
  },
} satisfies Prisma.TrainingProgramFindManyArgs;

export type CurrentProgram = Prisma.TrainingProgramGetPayload<
  typeof currentProgramArgs
>;

export type WorkoutFull = Prisma.WorkoutGetPayload<typeof WORKOUT_ARGS>;
export type WorkoutWidgetRes = Prisma.WorkoutGetPayload<typeof WORKOUT_ARGS> & {
  date: Date;
  isAllowedToStart: boolean;
};

export type ScheduleWidgetRes = WorkoutWithDate[];

export interface ProgramCompletionWidgetRes {
  workoutsCompleted: number;
  workoutsLeft: number;
  workoutsSkipped: number;
  completionPercentage: number;
  weeksPassed: number;
  daysOffset: number;
  weeksTotal: number;
}

export interface StreakWidgetRes {
  streakWeeks: number;
  workoutsSkipped: number;
}

export type TargetRes = Prisma.TargetGetPayload<{
  include: {
    trainingProgram: false;
  };
}>;

export type TargetFullRes = TargetRes & {
  completionPercentage: number;
  currentValue: number;
};

export interface TargetsWidgetRes {
  targets: TargetFullRes[];
}

export type WorkoutRecordRes = Prisma.WorkoutRecordGetPayload<{
  include: {
    exercises: {
      include: {
        sets: true;
      };
    };
  };
}>;

export interface ProgressChartExercisesData {
  exerciseName: string;
  values: number[];
  labels: string[];
}

export interface ProgressChartWidgetRes {
  chartData: ProgressChartExercisesData[];
}

export interface ClientDashboardResponse {
  upcomingWorkoutWidget: WorkoutFull | null;
  scheduleWidget: ScheduleWidgetRes | null;
  completionWidget: ProgramCompletionWidgetRes | null;
  streakWidget: StreakWidgetRes | null;
  targetsWidget: TargetsWidgetRes | null;
  progressChartWidget: ProgressChartWidgetRes | null;
}

export interface DashboardContext {
  profile: ClientProfile;
  program: CurrentProgram;
  records: WorkoutRecordRes[];
}
