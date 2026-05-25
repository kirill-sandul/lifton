import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { EditProfileDto, UserProfile } from '@core/models/user.models';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  private user = signal<UserProfile | null>(null)
  
  userProfile = this.user.asReadonly();

  getProfile(){
    return this.http.get<UserProfile>('user/getProfile', {}).pipe(
      tap(userData => this.user.set(userData))
    )
  }

  editProfile(profileChanges: EditProfileDto){
    return this.http.patch('user/editProfile', profileChanges).pipe(
      switchMap(() => this.getProfile())
    )
  }

  clear(){
    this.user.set(null);
  }
}
