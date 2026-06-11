import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { addDays } from 'date-fns';
import { PrismaService } from '../../core/modules/prisma/prisma.service';
import { AssignmentService } from '../../core/modules/assignment/assignment.service';
import {
  InviteStatus,
  NotificationActions,
  NotificationType,
  Role,
} from '../../generated/prisma/enums';
import { NotificationsService } from '../notifications/notifications.service';
import { UserService } from '../user/user.service';
import { Invite } from '../../generated/prisma/client';

@Injectable()
export class InviteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly assignmentService: AssignmentService,
    private readonly notificationService: NotificationsService,
  ) {}

  async sendInvite(fromUserId: string, userToInviteId: string) {
    const existingInvite = await this.prisma.invite.findFirst({
      where: {
        fromUserId: fromUserId,
        toUserId: userToInviteId,
        status: InviteStatus.PENDING,
      },
    });
    if (existingInvite)
      throw new BadRequestException({ type: 'INVITE_ALREADY_EXISTS' });

    const createdInvite = await this.prisma.invite.create({
      data: {
        fromUserId,
        toUserId: userToInviteId,
        expiresAt: addDays(new Date(), 7),
      },
    });

    // side effect
    await this.notificationService.createNotification({
      type: NotificationType.INVITE_SENT,
      inviteId: createdInvite.id,
      fromUserId,
      toUserId: userToInviteId,
      actions: [NotificationActions.ACCEPT, NotificationActions.DECLINE],
    });
  }

  private isInviteExpired(invite: Invite) {
    return invite.expiresAt && invite.expiresAt < new Date();
  }

  private async updatedRes(userId: string) {
    const updatedUser = await this.userService.getProfile(userId);
    const updatedNotifications = await this.notificationService.getAll(userId);

    return { updatedUser, updatedNotifications };
  }

  private async updateInviteStatus(inviteId: string, status: InviteStatus) {
    return this.prisma.invite.update({
      where: {
        id: inviteId,
      },
      data: {
        status,
      },
    });
  }

  private async normalizeInvite(
    invite: Invite,
    notificationId: string,
    userId: string,
  ) {
    await this.updateInviteStatus(invite.id, InviteStatus.EXPIRED);

    await this.notificationService.archiveNotification(notificationId);

    const { updatedUser, updatedNotifications } = await this.updatedRes(userId);

    return { updatedUser, updatedNotifications, inviteExpired: true };
  }

  private async getInvite(notificationId: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
      include: {
        invite: true,
      },
    });

    if (!notification)
      throw new NotFoundException({ type: 'NOTIFICATION_NOT_FOUND' });

    if (!notification.invite) {
      throw new BadRequestException({ type: 'NOTIFICATION_IS_NOT_AN_INVITE' });
    }

    const invite = notification.invite;

    if (invite.toUserId !== userId) {
      throw new ForbiddenException({ type: 'NOT_YOUR_INVITE' });
    }

    return invite;
  }

  private async handleAssignment(
    role: Role,
    userId: string,
    fromUserId: string,
  ) {
    if (role === Role.TRAINER) {
      return await this.assignmentService.assignTrainer(fromUserId, userId);
    } else {
      return await this.assignmentService.assignTrainer(userId, fromUserId);
    }
  }

  async acceptInvite(userId: string, role: Role, notificationId: string) {
    const invite = await this.getInvite(notificationId, userId);

    // 0. checks if invite is already expired
    if (this.isInviteExpired(invite))
      return await this.normalizeInvite(invite, notificationId, userId);

    // 1. business logic action
    await this.handleAssignment(role, userId, invite.fromUserId);

    // 2. invite state update
    await this.updateInviteStatus(invite.id, InviteStatus.ACCEPTED);

    // 3. notification side effect
    await this.notificationService.createNotification({
      type: NotificationType.INVITE_ACCEPTED,
      inviteId: invite.id,
      fromUserId: userId,
      toUserId: invite.fromUserId,
      actions: [NotificationActions.ARCHIVE, NotificationActions.SEE_PROFILE],
    });

    // 4. notification archiving
    await this.notificationService.archiveNotification(notificationId);

    // 5. response
    const { updatedUser, updatedNotifications } = await this.updatedRes(userId);

    return { updatedUser, updatedNotifications };
  }

  async declineInvite(userId: string, notificationId: string) {
    // 1. get invite
    const invite = await this.getInvite(notificationId, userId);

    // 3. auto archiving first invite notification
    await this.notificationService.archiveNotification(notificationId);

    // 3. notification side effect
    await this.notificationService.createNotification({
      type: NotificationType.INVITE_DECLINED,
      fromUserId: userId,
      toUserId: invite.fromUserId,
      inviteId: invite.id,
      actions: [NotificationActions.ARCHIVE, NotificationActions.SEE_PROFILE],
    });

    // 4. invite status update
    await this.updateInviteStatus(invite.id, InviteStatus.DECLINED);

    // 5. response
    const { updatedUser, updatedNotifications } = await this.updatedRes(userId);

    return { updatedUser, updatedNotifications };
  }
}
