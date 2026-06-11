import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './core/modules/prisma/prisma.module';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';
import { ClientModule } from './features/client/client.module';
import { TrainerModule } from './features/trainer/trainer.module';
import { SearchModule } from './features/search/search.module';
import { NotificationsModule } from './features/notifications/notifications.module';
import { InviteModule } from './features/invite/invite.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ClientModule,
    TrainerModule,
    SearchModule,
    NotificationsModule,
    InviteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
