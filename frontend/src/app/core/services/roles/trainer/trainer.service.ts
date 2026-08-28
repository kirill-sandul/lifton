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
        name: 'Powerlifting',
        day: WeekDay.SUNDAY,
        exercises: [
          {
            name: 'Bench Press',
            order: 0,
            unit: 'kg',
            sets: [
              { reps: 8, targetValue: 60, index: 1 },
              { reps: 8, targetValue: 62.5, index: 1 },
              { reps: 10, targetValue: 80, index: 1 },
            ],
          },
          {
            name: 'Squat',
            order: 1,
            unit: 'kg',
            sets: [
              { reps: 8, targetValue: 60, index: 1 },
              { reps: 8, targetValue: 62.5, index: 1 },
              { reps: 10, targetValue: 80, index: 1 },
            ],
          },
          {
            name: 'Deadlift',
            order: 2,
            unit: 'kg',
            sets: [
              { reps: 8, targetValue: 60, index: 1 },
              { reps: 8, targetValue: 62.5, index: 1 },
              { reps: 10, targetValue: 80, index: 1 },
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
