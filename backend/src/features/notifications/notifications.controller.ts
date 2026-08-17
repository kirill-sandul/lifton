import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(JwtGuard)
  @Get('get')
  getAll(@CurrentUser() user: { sub: string }) {
    return this.notificationsService.getAll(user.sub);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/archive')
  archiveNotification(
    @CurrentUser() user: { sub: string },
    @Param('id') notificationId: string,
  ) {
    return this.notificationsService.archiveNotification(
      notificationId,
      user.sub,
    );
  }
}
