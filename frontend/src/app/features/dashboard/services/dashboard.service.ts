import { computed, inject, Injectable } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { Target, Workout } from '@core/models/training.models';
import { UserGoal } from '@core/models/user.models';

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
      day: 'WEDNESDAY',
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
      type: UserGoal.STRENGTH,
      name: 'Bench press',
      currentValue: 60,
      targetValue: 100,
      unit: 'kg',
      completionPercent: 42,
      exerciseId: 'ex_1',
      trainingPlanId: 'plan_1',
    },
    {
      id: 't2',
      type: UserGoal.FATLOSS,
      name: 'Body weight',
      currentValue: 78,
      targetValue: 72,
      unit: 'kg',
      completionPercent: 65,
      exerciseId: null,
      trainingPlanId: 'plan_1',
    },
    {
      id: 't3',
      type: UserGoal.FATLOSS,
      name: '5km run',
      currentValue: 1600,
      targetValue: 1400,
      unit: 'sec',
      completionPercent: 25,
      exerciseId: null,
      trainingPlanId: 'plan_1',
    },
  ];

  assignedTrainer = computed(() => {
    if (this.userService.userProfile()?.role !== 'CLIENT') return null;

    return this.userService.userProfile()?.clientProfile!.assignedTrainer;
  });

  assignedProgram = computed(() => {
    if (this.userService.userProfile()?.role !== 'CLIENT') return null;

    return !this.userService.userProfile()?.clientProfile!.currentProgram;
  });

}
