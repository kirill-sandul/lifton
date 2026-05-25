import { Module } from '@nestjs/common';
import { StorageModule } from 'src/core/modules/storage/storage.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [StorageModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
