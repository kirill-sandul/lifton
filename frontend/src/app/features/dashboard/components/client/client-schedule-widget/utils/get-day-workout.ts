import { startOfDay } from 'date-fns';
import { ScheduleWidgetResponse, WorkoutWithDate } from '@core/api-contract/dashboard.api';

const scheduleCache = new WeakMap<ScheduleWidgetResponse, Map<number, WorkoutWithDate>>();

export const getDayWorkout = (
  schedule: ScheduleWidgetResponse | null,
  day: Date,
): WorkoutWithDate | null => {
  if (!schedule) return null;

  let workoutMap = scheduleCache.get(schedule);

  if (!workoutMap) {
    workoutMap = new Map<number, WorkoutWithDate>();

    schedule.forEach((workout) => {
      const dayTimestamp = startOfDay(new Date(workout.date)).getTime();
      workoutMap!.set(dayTimestamp, workout);
    });

    scheduleCache.set(schedule, workoutMap!);
  }

  const searchTimestamp = startOfDay(day).getTime();
  return workoutMap.get(searchTimestamp) || null;
};
