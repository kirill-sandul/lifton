import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { AssignmentModule } from '../../core/modules/assignment/assignment.module';
import { UserModule } from '../user/user.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [AssignmentModule, UserModule, NotificationsModule],
  providers: [InviteService],
  controllers: [InviteController],
})
export class InviteModule {}
