import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { EditProfileDto, UserProfile } from '@core/models/user.models';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  private user = signal<UserProfile | null>(null)
  
  userProfile = computed(() => this.user())

  getProfile(){
    return this.http.get<UserProfile>('user/getProfile', {}).pipe(
      tap(userData => this.user.set(userData))
    )
  }

  editPfp(newFile: File){
    const formData = new FormData();

    formData.append('newImg', newFile);

    console.log(formData, newFile);

    return this.http.post<UserProfile>('user/editPfp', formData).pipe(
      tap(userData => this.user.set(userData))
    )
  }

  editProfile(profileChanges: EditProfileDto){
    return this.http.patch<UserProfile>('user/editProfile', profileChanges).pipe(
      tap(userData => this.user.set(userData))
    )
  }

  clear(){
    this.user.set(null);
  }
}
