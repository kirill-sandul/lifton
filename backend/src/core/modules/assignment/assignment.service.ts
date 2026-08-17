import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssignmentService {
  constructor(private readonly prisma: PrismaService) {}

  async assignTrainer(clientId: string, trainerId: string) {
    const trainerProfile = await this.prisma.trainerProfile.findUnique({
      where: { userId: trainerId },
    });

    if (!trainerProfile)
      throw new NotFoundException('No trainer profile found when assigning');

    await this.prisma.clientProfile.update({
      where: { userId: clientId },
      data: {
        assignedTrainerProfileId: trainerProfile.id,
        assignedAt: new Date(),
      },
    });
  }
}
