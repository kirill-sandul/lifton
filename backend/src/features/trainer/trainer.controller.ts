import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { TrainerService } from './trainer.service';

@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @UseGuards(JwtGuard)
  @Post('invites/:id/accept')
  acceptInvite(
    @CurrentUser() user: { sub: string },
    @Param('id') notificationId: string,
  ) {
    return this.trainerService.acceptClient(notificationId, user.sub);
  }

  @UseGuards(JwtGuard)
  @Get('dashboard')
  getDashboard(@CurrentUser() user: { sub: string }) {
    return this.trainerService.getDashboard(user.sub);
  }
}
