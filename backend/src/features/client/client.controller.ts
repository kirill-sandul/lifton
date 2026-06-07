import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { CurrentUser } from '../../core/decorators/current-user.decorator';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(JwtGuard)
  @Post('invites/:id/accept')
  acceptInvite(
    @CurrentUser() user: { sub: string },
    @Param('id') notificationId: string,
  ) {
    return this.clientService.acceptTrainer(notificationId, user.sub);
  }
}
