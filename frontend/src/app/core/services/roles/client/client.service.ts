import { computed, inject, Injectable } from '@angular/core';
import { UserService } from '@core/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  userService = inject(UserService);

  noData = computed(() => {
    return !this.userService.userProfile()?.clientProfile?.currentProgram;
  });
}
