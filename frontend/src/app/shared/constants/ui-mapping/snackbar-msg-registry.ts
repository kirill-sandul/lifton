import { ApiKnownErrorResType } from '@shared/api-contract/errors';

export const SNACKBAR_MSG_REGISTRY = {
  [ApiKnownErrorResType.INVITE_ALREADY_EXISTS]: 'Invite has already been sent',
  // local success messages
  INVITE_ACCEPT: 'You have accepted the invitation',
  INVITE_DECLINE: 'You have declined the invitation',
  PROGRAM_CREATE: 'A new training program has been successfully created',
  // global unknown errors
  SEND_INVITE_FAIL: 'Failed to send an invite',
  NOTIFICATIONS_LOAD_FAIL: 'Failed to load notifications list',
  NOTIFICATION_ARCHIVE_FAIL: 'Failed to archive this notification',
  INVITE_ACCEPT_FAIL: 'Failed to accept the invitation',
  INVITE_DECLINE_FAIL: 'Failed to decline the invitation',
  PROGRAM_CREATE_FAIL: 'Failed to create new training program',
};
