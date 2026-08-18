import { computed, inject, Injectable } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { ClientWorkoutOnDay, WeekDay } from '@core/models/training.models';
import { UserGoal, UserRole } from '@core/models/user.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private http = inject(HttpClient);

  userService = inject(UserService);

  clientsWorkoutsOnDay: ClientWorkoutOnDay[] = [
    {
      id: 'fepwlpwf',
      username: 'fepwlpwf',
      usernameCanonical: 'fepwlpwf',
      fullName: 'Alicia Martinez',
      pfpUrl:
        'https://rdphpqnmuyeljhoecrfm.supabase.co/storage/v1/object/public/lifton/avatars/cd70a1a6-463a-4bbc-ad35-3c6bb45ed328.jpg',
      age: 25,
      active: true,
      email: 'lohevol@mailer.com',
      goal: UserGoal.MUSCLES,
      role: UserRole.CLIENT,
      phone: '+34651754534',
      receivedNotifications: [],
      plannedWorkout: {
        id: 'w1',
        name: 'Powerlifting',
        day: WeekDay.SUNDAY,
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
    },
  ];

  clients = computed(() => {
    const trainerProfile = this.userService.userProfile()?.trainerProfile;

    if (!trainerProfile) return [];

    return trainerProfile.clients;
  });

  noData = computed((): boolean => {
    return !this.userService.userProfile()?.trainerProfile!.clients?.length;
  });
}
