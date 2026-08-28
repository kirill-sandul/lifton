import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { UserProfile } from '@core/models/user.models';
import { EditProfileDto } from '@core/api-contract/user.api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  private user = signal<UserProfile | null>(null);

  userProfile = computed(() => this.user());
  role = computed(() => this.user()?.role);

  getProfile() {
    return this.http
      .get<UserProfile>(`user/getProfile`, {})
      .pipe(tap((userData) => this.updateProfile(userData)));
  }

  getProfileByUsername(username: string) {
    return this.http.get<UserProfile>(`user/getProfile/${username}`, {});
  }

  updateProfile(userProfile: UserProfile) {
    this.user.set(userProfile);
  }

  editPfp(newFile: File) {
    const formData = new FormData();

    formData.append('newImg', newFile);

    return this.http
      .post<UserProfile>('user/editPfp', formData)
      .pipe(tap((userData) => this.updateProfile(userData)));
  }

  editProfile(profileChanges: EditProfileDto) {
    return this.http
      .patch<UserProfile>('user/editProfile', profileChanges)
      .pipe(tap((userData) => this.updateProfile(userData)));
  }

  editUsername(newUsername: string) {
    return this.http.patch<UserProfile>(`user/editUsername`, { newUsername });
  }

  clear() {
    this.user.set(null);
  }
}
