import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { AssignmentModule } from '../../core/modules/assignment/assignment.module';

@Module({
  imports: [AssignmentModule],
  providers: [TrainerService],
  controllers: [TrainerController],
})
export class TrainerModule {}
