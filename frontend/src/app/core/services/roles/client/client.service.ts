import { computed, inject, Injectable } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);

  userService = inject(UserService);

  noData = computed(() => {
    return !this.userService.userProfile()?.clientProfile?.trainingProgramId;
  });
}
