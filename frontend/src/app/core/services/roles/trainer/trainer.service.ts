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

  clientsWorkoutsOnDay: ClientWorkoutOnDay[] = [];

  clients = computed(() => {
    const trainerProfile = this.userService.userProfile()?.trainerProfile;

    if (!trainerProfile) return [];

    return trainerProfile.clients;
  });

  noData = computed((): boolean => {
    return !this.userService.userProfile()?.trainerProfile!.clients?.length;
  });
}
