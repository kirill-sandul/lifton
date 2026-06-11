import { Controller } from '@nestjs/common';
import { ClientService } from './client.service';
import { AssignmentService } from '../../core/modules/assignment/assignment.service';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly assignmentService: AssignmentService,
  ) {}
}
