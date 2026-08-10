import { computed, inject, Injectable } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { Target, WeekDay, Workout } from '@core/models/training.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  userService = inject(UserService);

  detailedProfile = {};
  programSchedule: Workout[] = [
    {
      id: 'w1',
      name: 'Powerlifting',
      day: WeekDay.WEDNESDAY,
      trainingPlanId: 'plan_1',
      exercises: [
        {
          id: 'ex_1',
          name: 'Bench Press',
          workoutId: 'w1',
          unit: 'kg',
          sets: [
            { id: 's1', exerciseId: 'ex_1', reps: 8, targetValue: 60 },
            { id: 's2', exerciseId: 'ex_1', reps: 8, targetValue: 62.5 },
            { id: 's3', exerciseId: 'ex_2', reps: 10, targetValue: 80 },
          ],
        },
        {
          id: 'ex_2',
          name: 'Squat',
          workoutId: 'w2',
          unit: 'kg',
          sets: [
            { id: 's1', exerciseId: 'ex_1', reps: 8, targetValue: 60 },
            { id: 's2', exerciseId: 'ex_1', reps: 8, targetValue: 62.5 },
            { id: 's3', exerciseId: 'ex_2', reps: 10, targetValue: 80 },
          ],
        },
        {
          id: 'ex_3',
          name: 'Deadlift',
          unit: 'kg',
          workoutId: 'w3',
          sets: [
            { id: 's1', exerciseId: 'ex_1', reps: 8, targetValue: 60 },
            { id: 's2', exerciseId: 'ex_1', reps: 8, targetValue: 62.5 },
            { id: 's3', exerciseId: 'ex_2', reps: 10, targetValue: 80 },
          ],
        },
      ],
    },
  ];
  clientTargets: Target[] = [
    {
      id: 't1',
      name: 'Bench press',
      initialValue: 40,
      currentValue: 60,
      targetValue: 100,
      unit: 'kg',
      completionPercent: 42,
      exerciseId: 'ex_1',
      trainingPlanId: 'plan_1',
    },
    {
      id: 't2',
      name: 'Body weight',
      initialValue: 40,
      currentValue: 78,
      targetValue: 72,
      unit: 'kg',
      completionPercent: 65,
      exerciseId: null,
      trainingPlanId: 'plan_1',
    },
    {
      id: 't3',
      name: '5km run',
      initialValue: 1000,
      currentValue: 1600,
      targetValue: 1400,
      unit: 'sec',
      completionPercent: 25,
      exerciseId: null,
      trainingPlanId: 'plan_1',
    },
  ];

  assignedTrainer = computed(() => {
    if (this.userService.role() !== 'CLIENT') return null;

    return this.userService.userProfile()?.clientProfile!.assignedTrainer;
  });

  noData = computed((): boolean => {
    if (this.userService.role() === 'CLIENT') {
      return !this.userService.userProfile()?.clientProfile!.trainingProgramId;
    } else {
      return !this.userService.userProfile()?.trainerProfile!.clients?.length;
    }
  });
}
