import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/modules/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  searchClients(searchQuery: string) {
    if (searchQuery === '') return [];
    else if (!searchQuery) throw new BadRequestException('No search query');

    return this.prisma.user.findMany({
      where: {
        role: 'CLIENT',
        OR: [
          {
            fullName: {
              contains: searchQuery,
            },
          },
          {
            email: {
              contains: searchQuery,
            },
          },
        ],
      },
    });
  }
}
