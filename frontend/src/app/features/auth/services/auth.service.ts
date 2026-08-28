import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, take, tap } from 'rxjs';
import { UserService } from '@core/services/user/user.service';
import { UserProfile } from '@core/models/user.models';
import { AuthResponse, LoginDto, RegisterDto } from '@features/auth/models/auth.api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private userService = inject(UserService);

  private readonly _accessToken = signal<string | null>(null);
  readonly accessToken = this._accessToken.asReadonly();

  isRefreshing = signal(false);

  toFormData(jsonForm: Object) {
    const formData = new FormData();

    Object.entries(jsonForm).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    return formData;
  }

  register(registerDto: RegisterDto) {
    const formData = this.toFormData(registerDto);

    return this.http.post<AuthResponse>('auth/register', formData).pipe(
      tap(({ accessToken }) => this._accessToken.set(accessToken)),
      switchMap(() => this.userService.getProfile()),
    );
  }

  login({ identity, password }: LoginDto) {
    return this.http
      .post<AuthResponse>('auth/login', {
        identity,
        password,
      })
      .pipe(
        tap(({ accessToken }) => this._accessToken.set(accessToken)),
        switchMap(() => this.userService.getProfile()),
      );
  }

  logout() {
    this._accessToken.set(null);

    return this.http.post('auth/logout', {}).pipe(tap(() => this.userService.clear()));
  }

  refresh(): Observable<AuthResponse | UserProfile | null> {
    if (this.isRefreshing()) return of({ accessToken: this._accessToken() } as AuthResponse);
    this.isRefreshing.set(true);

    return this.http.post<AuthResponse>('auth/refresh', {}).pipe(
      tap(({ accessToken }) => {
        this._accessToken.set(accessToken);
      }),
      switchMap(() => this.userService.getProfile()),
      catchError(() => {
        this.isRefreshing.set(false);
        this.userService.clear();

        return of(null);
      }),
      take(1),
    );
  }
}
