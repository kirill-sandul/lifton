import { Injectable } from '@nestjs/common';
import { AssignmentService } from '../../core/modules/assignment/assignment.service';

@Injectable()
export class ClientService {
  constructor(private readonly assignmentService: AssignmentService) {}
}
