import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { AssignmentModule } from '../../core/modules/assignment/assignment.module';
import { ClientService } from '../client/client.service';

@Module({
  imports: [AssignmentModule],
  providers: [TrainerService, ClientService],
  controllers: [TrainerController],
})
export class TrainerModule {}
