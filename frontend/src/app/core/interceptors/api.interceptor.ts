import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@features/auth/services/auth.service';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken();

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const headers: Record<string, string> = {
    'x-user-timezone': userTimeZone,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return next(
    req.clone({
      url: `${environment.apiURL}/api/${req.url}`,
      withCredentials: true,
      setHeaders: headers,
    }),
  );
};
