import { Component, inject } from '@angular/core';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';
import {
  Notification,
  NotificationActionData,
  NotificationActions,
  NotificationType,
} from '@core/models/notification.models';
import { NotificationsFacade } from '@features/notifications/facade/notifications.facade';
import { NotificationActionsComponent } from '@features/notifications/components/notification-actions/notification-actions';
import { NOTIFICATION_MESSAGES } from '@shared/constants/ui-mapping/notification-registry';
import { TimeAgoPipe } from '@core/pipes/time-ago/time-ago.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications-dropdown',
  imports: [PfpCircleComponent, NotificationActionsComponent, TimeAgoPipe, RouterLink],
  templateUrl: './notifications-dropdown.html',
  styleUrl: './notifications-dropdown.scss',
})
export class NotificationsDropdownComponent {
  notificationsFacade = inject(NotificationsFacade);

  notifications = this.notificationsFacade.notifications;

  protected readonly NotificationType = NotificationType;
  protected readonly NOTIFICATION_MESSAGES = NOTIFICATION_MESSAGES;

  private actionsHandlers: Record<NotificationActions, (notification: Notification) => void> = {
    [NotificationActions.ACCEPT_INVITE]: (notification) => {
      this.notificationsFacade.acceptInvite(notification.id);
    },
    [NotificationActions.DECLINE_INVITE]: (notification) => {
      this.notificationsFacade.declineInvite(notification.id);
    },
    [NotificationActions.ARCHIVE]: (notification) => {
      this.notificationsFacade.archiveNotification(notification.id);
    },
    [NotificationActions.SEE_PROFILE]: (notification) => {
      this.notificationsFacade.openProfile(notification.fromUser.username);
    },
  };

  handleNotificationAction({ actionType, notification }: NotificationActionData) {
    this.actionsHandlers[actionType](notification);
  }
}
