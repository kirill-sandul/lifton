import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(JwtGuard)
  @Get('clients')
  searchClients(@Query('searchQuery') searchQuery: string) {
    return this.searchService.searchClients(searchQuery);
  }
}
