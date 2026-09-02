import { Prisma } from '../../generated/prisma/client';

const workoutArgs = {
  include: {
    exercises: {
      include: {
        sets: true,
      },
    },
  },
};

const currentProgramArgs = {
  include: {
    weeks: {
      include: {
        workouts: workoutArgs,
      },
    },
    targets: true,
  },
} satisfies Prisma.TrainingProgramFindManyArgs;

export type CurrentProgram = Prisma.TrainingProgramGetPayload<
  typeof currentProgramArgs
>;

export type WorkoutFull = Prisma.WorkoutGetPayload<typeof workoutArgs>;
export type WorkoutWidgetRes = Prisma.WorkoutGetPayload<typeof workoutArgs> & {
  date: Date;
  isAllowedToStart: boolean;
};

export type WorkoutWithDate = Prisma.WorkoutGetPayload<typeof workoutArgs> & {
  date: Date;
};
export type ScheduleWidgetRes = WorkoutWithDate[];

export interface ClientDashboardResponse {
  upcomingWorkoutWidget: WorkoutFull | null;
  scheduleWidget: ScheduleWidgetRes | null;
}
