import { computed, inject, Injectable, signal } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { ClientDashboard, ClientDashboardRes } from '@core/models/dashboard.models';
import { tap } from 'rxjs';

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
}
