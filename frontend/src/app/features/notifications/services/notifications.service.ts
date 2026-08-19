import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '@core/models/notification.models';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  _notifications = signal<Notification[]>([]);
  notifications = this._notifications.asReadonly();

  constructor(private http: HttpClient) {}

  updateNotifications(notifications: Notification[]) {
    this._notifications.set(notifications);
  }

  getNotifications() {
    return this.http.get<Notification[]>(`notifications/get`).pipe(
      tap((res: Notification[]) => {
        this.updateNotifications(res);
      }),
    );
  }

  archiveNotification(notificationId: string) {
    return this.http.patch<Notification[]>(`notifications/${notificationId}/archive`, {}).pipe(
      tap((res: Notification[]) => {
        this.updateNotifications(res);
      }),
    );
  }
}
