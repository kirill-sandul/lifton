import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ClientService } from '@core/services/roles/client/client.service';
import { catchError, map, of } from 'rxjs';
import { WorkoutSessionFacade } from '@features/workout-session/facade/workout-session.facade';

export const workoutSessionGuard: CanActivateFn = () => {
  const router = inject(Router);
  const clientService = inject(ClientService);
  const workoutSessionFacade = inject(WorkoutSessionFacade);

  return clientService.getTodaysWorkout().pipe(
    map((workoutData) => {
      if (workoutData) {
        workoutSessionFacade.init(workoutData);

        return true;
      }

      router.navigate(['/']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/']);

      return of(false);
    }),
  );
};
