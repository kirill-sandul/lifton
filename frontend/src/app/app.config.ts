import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from '@core/interceptors/api.interceptor';
import { AuthService } from '@features/auth/services/auth.service';
import { provideLucideIcons } from '@lucide/angular';
import { APP_ICONS } from '@core/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideAppInitializer(() => {
      const authService = inject(AuthService);

      return firstValueFrom(
        authService.refresh().pipe(
          timeout(2000),
          catchError((err) => {
            console.error(err);
            return of(null);
          }),
        ),
      );
    }),
    provideLucideIcons(...APP_ICONS),
    provideCharts(withDefaultRegisterables()),
  ],
};
