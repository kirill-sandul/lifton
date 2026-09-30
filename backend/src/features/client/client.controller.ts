import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { UserTimeZone } from '../../core/decorators/user-timezone.decorator';
import { Role } from '../../generated/prisma/enums';
import { SkipWorkoutDto, WorkoutSessionRecordDto } from './dto/client.dto';

@Controller('client')
@UseGuards(JwtGuard)
@Roles(Role.CLIENT)
@UseGuards(RoleGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('dashboard')
  getDashboard(
    @CurrentUser() user: { sub: string },
    @UserTimeZone() tz: string,
  ) {
    return this.clientService.getDashboard(user.sub, tz);
  }

  @Get('workout-session')
  getWorkoutSession(
    @CurrentUser() user: { sub: string },
    @UserTimeZone() tz: string,
  ) {
    return this.clientService.getTodaysWorkout(user.sub, tz);
  }

  @Post('workout-session/record')
  recordWorkoutSession(
    @CurrentUser() user: { sub: string },
    @Body() workoutRecord: WorkoutSessionRecordDto,
  ) {
    return this.clientService.createWorkoutRecord(user.sub, workoutRecord);
  }

  @Post('workout-session/skip')
  skipWorkoutSession(
    @CurrentUser() user: { sub: string },
    @Body() { skipReason }: SkipWorkoutDto,
    @UserTimeZone() tz: string,
  ) {
    return this.clientService.createSkippedWorkoutRecord(
      user.sub,
      skipReason,
      tz,
    );
  }
}
