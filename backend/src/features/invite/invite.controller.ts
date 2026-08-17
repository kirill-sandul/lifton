import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { InviteService } from './invite.service';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { Role } from '../../generated/prisma/enums';

@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post('send/:id')
  @UseGuards(JwtGuard)
  sendInvite(
    @CurrentUser() user: { sub: string },
    @Param('id') userToInvite: string,
  ) {
    return this.inviteService.sendInvite(user.sub, userToInvite);
  }

  @UseGuards(JwtGuard)
  @Post(':id/accept')
  acceptInvite(
    @CurrentUser() user: { sub: string; role: Role },
    @Param('id') notificationId: string,
  ) {
    return this.inviteService.acceptInvite(user.sub, user.role, notificationId);
  }

  @UseGuards(JwtGuard)
  @Post(':id/decline')
  declineInvite(
    @CurrentUser() user: { sub: string },
    @Param('id') notificationId: string,
  ) {
    return this.inviteService.declineInvite(user.sub, notificationId);
  }
}
