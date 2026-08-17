import { inject, Injectable } from '@angular/core';
import { UserProfile } from '@core/models/user.models';
import { HttpClient } from '@angular/common/http';
import { Notification } from '@core/models/notification.models';

export type InviteActionRes = { updatedUser: UserProfile; updatedNotifications: Notification[] };

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  http = inject(HttpClient);

  sendInvite(toUserId: string) {
    return this.http.post(`invite/send/${toUserId}`, {});
  }

  acceptInvite(notificationId: string) {
    return this.http.post<InviteActionRes>(`invite/${notificationId}/accept`, {});
  }

  declineInvite(notificationId: string) {
    return this.http.post<InviteActionRes>(`invite/${notificationId}/decline`, {});
  }
}
