import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '@core/services/user/user.service';
import {
  TrainerDashboardRes,
  TrainerTodoListItem,
  TrainerTodoListWidgetRes,
} from '@core/api-contract/dashboard.api';
import { BehaviorSubject, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private http = inject(HttpClient);

  userService = inject(UserService);

  private readonly _dashboardData = signal<TrainerDashboardRes | null>(null);
  dashboardData = this._dashboardData.asReadonly();

  clients = computed(() => {
    const trainerProfile = this.userService.userProfile()?.trainerProfile;

    if (!trainerProfile) return [];

    return trainerProfile.clients;
  });

  noData = computed((): boolean => {
    return !this.userService.userProfile()?.trainerProfile!.clients?.length;
  });

  getDashboard() {
    return this.http
      .get<TrainerDashboardRes>('trainer/dashboard')
      .pipe(tap((data) => this._dashboardData.set(data)));
  }

  addTask(taskId: string, taskContent: string) {
    return this.http.post('trainer/dashboard/todo', {
      taskId,
      content: taskContent,
    });
  }

  editTask({ taskId, completed }: { taskId: string; completed?: boolean }) {
    return this.http.patch(`trainer/dashboard/todo/${taskId}`, {
      completed,
    });
  }

  removeTask(taskId: string) {
    return this.http.delete(`trainer/dashboard/todo/${taskId}`);
  }
}
