import { Prisma } from '../../generated/prisma/client';

export const WORKOUT_ARGS = {
  include: {
    exercises: {
      include: {
        sets: true,
      },
    },
  },
};

export type WorkoutWithDate = Prisma.WorkoutGetPayload<typeof WORKOUT_ARGS> & {
  date: Date;
};
