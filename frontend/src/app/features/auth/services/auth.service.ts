import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, RegisterDto } from '@features/auth/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  
  register(registerDto: RegisterDto){
    const formData = this.toFormData(registerDto);

    return this.http.post<AuthResponse>('auth/register', formData);
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
}
