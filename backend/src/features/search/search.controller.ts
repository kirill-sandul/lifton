import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { SearchService } from './search.service';
import { Role } from '../../generated/prisma/enums';
import { CurrentUser } from '../../core/decorators/current-user.decorator';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('')
  @UseGuards(JwtGuard)
  searchClients(
    @CurrentUser() user: { _: string; role: Role },
    @Query('searchQuery') searchQuery: string,
  ) {
    return this.searchService.searchUsers(searchQuery, user.role);
  }
}
