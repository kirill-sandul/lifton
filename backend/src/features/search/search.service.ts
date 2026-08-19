import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/modules/prisma/prisma.service';
import { Role } from '../../generated/prisma/enums';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  searchUsers(searchQuery: string, role: Role) {
    if (searchQuery === '') return [];
    else if (!searchQuery) throw new BadRequestException('No search query');

    const reverseRole = role === Role.CLIENT ? Role.TRAINER : Role.CLIENT;

    return this.prisma.user.findMany({
      where: {
        role: reverseRole,
        OR: [
          {
            clientProfile: {
              is: {
                assignedTrainerProfileId: null,
              },
            },
          },
          {
            clientProfile: null,
          },
        ],
        AND: [
          {
            OR: [
              {
                fullName: {
                  contains: searchQuery,
                  mode: 'insensitive',
                },
              },
              {
                username: {
                  contains: searchQuery,
                  mode: 'insensitive',
                },
              },
            ],
          },
        ],
      },
    });
  }
}
