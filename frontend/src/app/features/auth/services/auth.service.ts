import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, LoginDto, RegisterDto } from '@features/auth/models/auth.models';
import { catchError, of, retry, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  
  private readonly _accessToken = signal<string | null>(null);
  readonly accessToken = this._accessToken.asReadonly();

  private isRefreshing = false;

  register(registerDto: RegisterDto){
    const formData = this.toFormData(registerDto);

    return this.http.post<AuthResponse>('auth/register', formData).pipe(
      tap(({ accessToken }) => this._accessToken.set(accessToken))
    )
  }

  login({ email, password }: LoginDto){
    return this.http.post<AuthResponse>('auth/login', {
      email,
      password
    }).pipe(
      tap(({ accessToken }) => this._accessToken.set(accessToken))
    )
  }

  toFormData(jsonForm: Object){
    const formData = new FormData();

    Object.entries(jsonForm).forEach(([key, value]) => {
      if(value !== null && value !== undefined) {
        formData.append(key, value)
      }
    })

    return formData;
  }

  refresh(){
    if(this.isRefreshing) return of({ accessToken: this._accessToken() } as AuthResponse);;
    this.isRefreshing = true;

    return this.http.post<AuthResponse>('auth/refresh', {}).pipe(
      retry({ count: 1, delay: 300 }),
      tap(({ accessToken }) => {
        this._accessToken.set(accessToken)
      }),
      catchError(() => {
        this.isRefreshing = false;
        return of(null);
      })
    )
  }
}
