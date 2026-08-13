import { Module } from '@nestjs/common';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})
export class ProgramsModule {}
