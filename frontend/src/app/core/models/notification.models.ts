export interface Notification {
  id: string;
  fromUserId: string;
  fromUser: {
    id: string;
    fullName: string;
    pfpUrl?: string;
  };
  toUserId: string;
  inviteId?: string;
  type: NotificationType;
  actions: NotificationActions;
  archived: boolean;
  createdAt: Date;
}

export enum NotificationActions {
  ACCEPT_INVITE = 'ACCEPT_INVITE',
  DECLINE_INVITE = 'DECLINE_INVITE',
  ARCHIVE = 'ARCHIVE',
  SEE_PROFILE = 'SEE_PROFILE',
}

export enum NotificationType {
  INVITE_SENT = 'INVITE_SENT',
  INVITE_ACCEPTED = 'INVITE_ACCEPTED',
  INVITE_DECLINED = 'INVITE_DECLINED',
}

export type NotificationActionUiStyle = 'success' | 'warning' | 'error' | 'link';

export type NotificationActionUiModel = {
  type: NotificationActions;
  label: string;
  style: NotificationActionUiStyle;
};
