import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { TrainerService } from './trainer.service';
import { AssignmentService } from '../../core/modules/assignment/assignment.service';

@Controller('trainer')
export class TrainerController {
  constructor(
    private readonly trainerService: TrainerService,
    private readonly assignmentService: AssignmentService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('dashboard')
  getDashboard(@CurrentUser() user: { sub: string }) {
    return this.trainerService.getDashboard(user.sub);
  }
}
