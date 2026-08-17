import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { AssignmentModule } from '../../core/modules/assignment/assignment.module';

@Module({
  imports: [AssignmentModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
