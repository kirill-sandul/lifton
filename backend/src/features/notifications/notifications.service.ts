import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/modules/prisma/prisma.service';
import {
  NotificationActions,
  NotificationType,
} from '../../generated/prisma/enums';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(userId: string) {
    const found = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        receivedNotifications: {
          include: {
            fromUser: {
              select: {
                id: true,
                username: true,
                fullName: true,
                pfpUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!found) throw new NotFoundException('User not Found');

    return found.receivedNotifications;
  }

  async getById(notificationId: string) {
    return this.prisma.notification.findUnique({
      where: { id: notificationId },
    });
  }

  async createNotification(notification: {
    type: NotificationType;
    fromUserId: string;
    toUserId: string;
    inviteId?: string;
    actions: NotificationActions[];
  }) {
    return this.prisma.notification.create({
      data: {
        type: notification.type,
        fromUserId: notification.fromUserId,
        toUserId: notification.toUserId,
        inviteId: notification.inviteId ?? null,
        actions: notification.actions,
      },
    });
  }

  async archiveNotification(notificationId: string, userId?: string) {
    await this.prisma.notification.update({
      where: { id: notificationId },
      data: {
        archived: true,
      },
    });

    if (userId) return this.getAll(userId);
  }
}
