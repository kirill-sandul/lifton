import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from '@core/interceptors/api.interceptor';
import { AuthService } from '@features/auth/services/auth.service';
import { catchError, of } from 'rxjs';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.refresh().pipe(catchError(() => of(false)))
    })
  ]
};
