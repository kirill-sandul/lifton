import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from '@core/services/user/user.service';
import { ClientDashboard, ClientDashboardRes } from '@core/models/dashboard.models';
import { WorkoutRecordUi } from '@core/models/training.models';
import { CreateWorkoutRecordDto, WorkoutResponse } from '@core/api-contract/training.api';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);

  userService = inject(UserService);

  private readonly _dashboardData = signal<ClientDashboard | null>(null);
  dashboardData = this._dashboardData.asReadonly();

  noData = computed(() => {
    return !this.userService.userProfile()?.clientProfile?.trainingProgramId;
  });

  getDashboard() {
    return this.http
      .get<ClientDashboardRes>('client/dashboard')
      .pipe(tap((data) => this._dashboardData.set(data)));
  }

  getTodaysWorkout() {
    return this.http.get<WorkoutResponse>('client/workout-session');
  }

  submitWorkoutRecord(workoutRecord: WorkoutRecordUi) {
    const preparedWorkoutRecord: CreateWorkoutRecordDto = {
      ...workoutRecord,
      durationSec: workoutRecord.durationSec,
      exercises: workoutRecord.exercises.map((ex) => ({
        name: ex.name,
        unit: ex.unit,
        order: ex.order,
        skipped: ex.skipped,
        sets: ex.sets.map(
          ({ index, executedReps, executedValue, targetValue, targetReps, skipped }) => ({
            index,
            executedReps,
            executedValue,
            targetValue,
            targetReps,
            skipped,
          }),
        ),
      })),
    };

    return this.http.post('client/workout-session/record', preparedWorkoutRecord);
  }
}
