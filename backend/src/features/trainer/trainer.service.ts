import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/modules/prisma/prisma.service';
import { AssignmentService } from '../../core/modules/assignment/assignment.service';

@Injectable()
export class TrainerService {
  constructor(
    private readonly prisma: PrismaService,
    private assignmentService: AssignmentService,
  ) {}

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
    // if (trainerCurrInfo.clients.length === 0) {
    // }
  }
}
