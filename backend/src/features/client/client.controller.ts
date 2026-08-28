import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { Role } from '../../generated/prisma/enums';
import { RoleGuard } from '../../core/guards/role.guard';
import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { WorkoutSessionRecordDto } from './dto/client.dto';

@Controller('client')
@UseGuards(JwtGuard)
@Roles(Role.CLIENT)
@UseGuards(RoleGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('dashboard')
  getDashboard(@CurrentUser() user: { sub: string }) {
    return this.clientService.getDashboard(user.sub);
  }

  @Get('workout-session')
  getWorkoutSession(@CurrentUser() user: { sub: string }) {
    return this.clientService.getTodaysWorkout(user.sub);
  }

  @Post('workout-session/record')
  recordWorkoutSession(
    @CurrentUser() user: { sub: string },
    @Body() workoutRecord: WorkoutSessionRecordDto,
  ) {
    return this.clientService.createWorkoutRecord(user.sub, workoutRecord);
  }
}
