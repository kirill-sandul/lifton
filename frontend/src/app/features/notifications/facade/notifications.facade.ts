import { computed, inject, Injectable, signal } from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { InviteService } from '@features/invite/services/invite.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { UserService } from '@core/services/user/user.service';
import { NotificationsService } from '@features/notifications/services/notifications.service';
import { Notification } from '@core/models/notification.models';
import { SNACKBAR_MSG_REGISTRY } from '@shared/constants/ui-mapping/snackbar-msg-registry';

@Injectable({
  providedIn: 'root',
})
export class NotificationsFacade {
  userService = inject(UserService);
  notificationsService = inject(NotificationsService);
  inviteService = inject(InviteService);
  snackbarService = inject(SnackbarService);

  notifications = computed<Notification[]>(() => this.notificationsService.notifications());

  notificationsLength = computed(() => {
    let length = 0;

    this.notificationsService.notifications().forEach((notification: Notification) => {
      if (notification.archived) return;
      length += 1;
    });

    return length;
  });

  showNotifications = signal(false);

  backdropPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];

  toggleNotifications() {
    this.showNotifications.update((v) => !v);
  }

  getNotifications() {
    this.notificationsService.getNotifications().subscribe({
      error: () => {
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.NOTIFICATIONS_LOAD_FAIL, 'error');
      },
    });
  }

  archiveNotification(notificationId: string) {
    this.notificationsService.archiveNotification(notificationId).subscribe({
      error: () => {
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.NOTIFICATION_ARCHIVE_FAIL, 'error');
      },
    });
  }

  acceptInvite(notificationId: string) {
    this.inviteService.acceptInvite(notificationId).subscribe({
      next: ({ updatedUser, updatedNotifications }) => {
        this.notificationsService.updateNotifications(updatedNotifications);
        this.userService.updateProfile(updatedUser);
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.INVITE_ACCEPT, 'success');
      },
      error: () => {
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.INVITE_ACCEPT_FAIL, 'error');
      },
    });
  }

  declineInvite(notificationId: string) {
    this.inviteService.declineInvite(notificationId).subscribe({
      next: ({ updatedUser, updatedNotifications }) => {
        this.notificationsService.updateNotifications(updatedNotifications);
        this.userService.updateProfile(updatedUser);
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.INVITE_DECLINE, 'success');
      },
      error: () => {
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.INVITE_DECLINE_FAIL, 'error');
      },
    });
  }
}
