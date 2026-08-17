import { Component, inject } from '@angular/core';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';
import { NotificationActions, NotificationType } from '@core/models/notification.models';
import { NotificationsFacade } from '@features/notifications/facade/notifications.facade';
import { NotificationActionsComponent } from '@features/notifications/components/notification-actions/notification-actions';
import { NOTIFICATION_MESSAGES } from '@shared/constants/ui-mapping/notification-registry';
import { TimeAgoPipe } from '@core/pipes/time-ago/time-ago.pipe';

@Component({
  selector: 'app-notifications-dropdown',
  imports: [PfpCircleComponent, NotificationActionsComponent, TimeAgoPipe],
  templateUrl: './notifications-dropdown.html',
  styleUrl: './notifications-dropdown.scss',
})
export class NotificationsDropdownComponent {
  notificationsFacade = inject(NotificationsFacade);

  notifications = this.notificationsFacade.notifications;

  protected readonly NotificationType = NotificationType;
  protected readonly NOTIFICATION_MESSAGES = NOTIFICATION_MESSAGES;

  private actionsHandlers: Record<NotificationActions, (notificationId: string) => void> = {
    [NotificationActions.ACCEPT_INVITE]: (notificationId) => {
      this.notificationsFacade.acceptInvite(notificationId);
    },
    [NotificationActions.DECLINE_INVITE]: (notificationId) => {
      this.notificationsFacade.declineInvite(notificationId);
    },
    [NotificationActions.ARCHIVE]: (notificationId) => {
      this.notificationsFacade.archiveNotification(notificationId);
    },
    [NotificationActions.SEE_PROFILE]: (notificationId) => {},
  };

  handleNotificationAction(actionType: NotificationActions, notificationId: string) {
    this.actionsHandlers[actionType](notificationId);
  }
}
