import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../core/modules/prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async acceptTrainer(userId: string, notificationId: string) {
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

    await this.prisma.clientProfile.update({
      where: { userId },
      data: {
        assignedTrainerProfileId: invite.fromUserId,
        assignedAt: new Date(),
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
}
