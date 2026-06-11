import { Component, inject, input, output } from '@angular/core';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';
import { NotificationActions, NotificationType } from '@core/models/notification.models';
import { NotificationsFacadeService } from '@features/notifications/services/notifications-facade.service';
import { NotificationActionsComponent } from '@features/notifications/components/notification-actions/notification-actions';
import { NOTIFICATION_MESSAGES } from '@shared/constants/ui-mapping/notification-registry';
import { TimeAgoPipe } from '@core/pipes/time-ago-pipe';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'app-notifications-dropdown',
  imports: [PfpCircleComponent, NotificationActionsComponent, TimeAgoPipe],
  templateUrl: './notifications-dropdown.html',
  styleUrl: './notifications-dropdown.scss',
})
export class NotificationsDropdownComponent {
  notificationsFacade = inject(NotificationsFacadeService);

  dropdownTrigger = input.required<CdkOverlayOrigin>();
  onClose = output();

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
