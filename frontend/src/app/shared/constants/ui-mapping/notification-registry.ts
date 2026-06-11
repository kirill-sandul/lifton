import {
  Notification,
  NotificationActions,
  NotificationActionUiModel,
  NotificationType,
} from '@core/models/notification.models';

export const NOTIFICATION_ACTIONS: Record<NotificationType, NotificationActionUiModel[]> = {
  [NotificationType.INVITE_SENT]: [
    {
      type: NotificationActions.ACCEPT_INVITE,
      label: 'Accept',
      style: 'success',
    },
    {
      type: NotificationActions.DECLINE_INVITE,
      label: 'Decline',
      style: 'error',
    },
  ],
  [NotificationType.INVITE_ACCEPTED]: [
    {
      type: NotificationActions.ARCHIVE,
      label: 'Archive',
      style: 'warning',
    },
    {
      type: NotificationActions.SEE_PROFILE,
      label: 'See profile',
      style: 'link',
    },
  ],
  [NotificationType.INVITE_DECLINED]: [
    {
      type: NotificationActions.ARCHIVE,
      label: 'Archive',
      style: 'warning',
    },
    {
      type: NotificationActions.SEE_PROFILE,
      label: 'See profile',
      style: 'link',
    },
  ],
};

export const NOTIFICATION_MESSAGES: Record<NotificationType, (n: Notification) => string> = {
  [NotificationType.INVITE_SENT]: (n: Notification) =>
    `${n.fromUser.fullName} sent you an invitation`,

  [NotificationType.INVITE_ACCEPTED]: (n: Notification) =>
    `${n.fromUser.fullName} accepted your invitation`,

  [NotificationType.INVITE_DECLINED]: (n: Notification) =>
    `${n.fromUser.fullName} declined your invitation`,
};
