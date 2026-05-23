import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "@features/auth/services/auth.service";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken();
  
  return next(
    req.clone({
      url: `http://localhost:3000/api/${req.url}`,
      withCredentials: true,
      setHeaders: token ? { Authorization: `Bearer ${token}` } : {}
    })
  )
}