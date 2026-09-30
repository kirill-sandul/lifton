import { startOfDay } from 'date-fns';
import { ClientWorkoutOnDay, TrainerScheduleWidgetRes } from '@core/api-contract/dashboard.api';

const scheduleCache = new WeakMap<TrainerScheduleWidgetRes, Map<number, ClientWorkoutOnDay[]>>();

export const getDayTrainerWorkouts = (
  schedule: TrainerScheduleWidgetRes | null,
  day: Date,
): ClientWorkoutOnDay[] | null => {
  if (!schedule) return null;

  let workoutMap = scheduleCache.get(schedule);

  if (!workoutMap) {
    workoutMap = new Map<number, ClientWorkoutOnDay[]>();

    Object.entries(schedule).forEach(([date, workout]) => {
      const dayTimestamp = startOfDay(new Date(date)).getTime();
      workoutMap!.set(dayTimestamp, workout);
    });

    scheduleCache.set(schedule, workoutMap!);
  }

  const searchTimestamp = startOfDay(day).getTime();
  return workoutMap.get(searchTimestamp) || null;
};
