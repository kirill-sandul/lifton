import { Component, input, output } from '@angular/core';
import {
  Notification,
  NotificationActionData,
  NotificationType,
} from '@core/models/notification.models';
import { NOTIFICATION_ACTIONS } from '@shared/constants/ui-mapping/notification-registry';

@Component({
  selector: 'app-notification-actions',
  imports: [],
  templateUrl: './notification-actions.html',
  styleUrl: './notification-actions.scss',
})
export class NotificationActionsComponent {
  notification = input.required<Notification>();

  onAction = output<NotificationActionData>();

  protected readonly NotificationType = NotificationType;
  protected readonly NOTIFICATION_ACTIONS = NOTIFICATION_ACTIONS;
}
