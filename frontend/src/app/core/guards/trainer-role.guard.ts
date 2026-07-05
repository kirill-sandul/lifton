import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@core/services/user/user.service';
import { inject } from '@angular/core';
import { UserRole } from '@core/models/user.models';

export const trainerRoleGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.role() === UserRole.TRAINER) return true;

  router.navigate(['']);

  return false;
};
