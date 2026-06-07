import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../core/modules/prisma/prisma.service';

@Injectable()
export class TrainerService {
  constructor(private readonly prisma: PrismaService) {}

  async acceptClient(userId: string, notificationId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
      include: {
        invite: true,
      },
    });

    if (!notification) throw new NotFoundException('Notification not Found');

    if (!notification.invite) {
      throw new BadRequestException('Notification is not an invite');
    }

    const invite = notification.invite;

    if (invite.toUserId !== userId) {
      throw new ForbiddenException('Not your invite');
    }

    await this.prisma.trainerProfile.update({
      where: { userId },
      data: {
        clients: {
          connect: {
            id: invite.fromUserId,
          },
        },
      },
    });

    await this.prisma.invite.update({
      where: { id: invite.id },
      data: {
        status: 'ACCEPTED',
      },
    });

    await this.prisma.notification.update({
      where: { id: notificationId },
      data: {
        archived: true,
      },
    });
  }

  async getDashboard(userId: string) {
    const trainerCurrInfo = await this.prisma.trainerProfile.findUnique({
      where: { userId },
      include: {
        clients: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!trainerCurrInfo) return;
    if (trainerCurrInfo.clients.length === 0) {
    }
  }
}
