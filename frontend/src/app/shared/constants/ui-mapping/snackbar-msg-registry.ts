import { ApiKnownErrorResType } from '@shared/api-contract/errors';

export const SNACKBAR_MSG_REGISTRY = {
  [ApiKnownErrorResType.INVALID_CREDENTIALS]: '',
  [ApiKnownErrorResType.EXISTING_USERNAME]: '',
  [ApiKnownErrorResType.EXISTING_EMAIL]: '',
  [ApiKnownErrorResType.INVITE_ALREADY_EXISTS]: 'Invite has already been sent',
  // local success messages
  SEND_INVITE: 'Invitation sent successfully',
  INVITE_ACCEPT: 'You have accepted the invitation',
  INVITE_DECLINE: 'You have declined the invitation',
  PROGRAM_CREATE: 'A new training program has been successfully created',
  ASSIGN_CLIENT_TO_PROGRAM: 'New client has been assigned',
  REMOVE_CLIENT_FROM_PROGRAM: 'Removed client from the program',
  EDIT_USERNAME: 'Edited username successfully',
  // global unknown errors
  SEND_INVITE_FAIL: 'Failed to send an invite',
  NOTIFICATIONS_LOAD_FAIL: 'Failed to load notifications list',
  NOTIFICATION_ARCHIVE_FAIL: 'Failed to archive this notification',
  INVITE_ACCEPT_FAIL: 'Failed to accept the invitation',
  INVITE_DECLINE_FAIL: 'Failed to decline the invitation',
  PROGRAM_CREATE_FAIL: 'Failed to create new training program',
  ASSIGN_CLIENT_TO_PROGRAM_FAIL: 'Failed to assign client to the program',
  REMOVE_CLIENT_FROM_PROGRAM_FAIL: 'Failed to remove client from the program',
  EDIT_USERNAME_FAIL: 'Failed to edit your username',
};
