import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { TrainerService } from './trainer.service';
import { RoleGuard } from '../../core/guards/role.guard';
import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserTimeZone } from '../../core/decorators/user-timezone.decorator';
import { TodoListItem, TodoListItemUpdate } from './dto/trainer.dto';

@Controller('trainer')
@Roles('TRAINER')
@UseGuards(RoleGuard)
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @UseGuards(JwtGuard)
  @Get('dashboard')
  getDashboard(
    @CurrentUser() user: { sub: string },
    @UserTimeZone() tz: string,
  ) {
    return this.trainerService.getDashboard(user.sub, tz);
  }

  @UseGuards(JwtGuard)
  @Post('dashboard/todo')
  addTodoTask(@CurrentUser() user: { sub: string }, @Body() dto: TodoListItem) {
    return this.trainerService.addTodoTask(user.sub, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('dashboard/todo/:taskId')
  editTodoTask(
    @CurrentUser() user: { sub: string },
    @Param('taskId') taskId: string,
    @Body() dto: TodoListItemUpdate,
  ) {
    return this.trainerService.editTodoTask(user.sub, taskId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('dashboard/todo/:taskId')
  removeTodoTask(
    @CurrentUser() user: { sub: string },
    @Param('taskId') taskId: string,
  ) {
    return this.trainerService.removeTodoTask(user.sub, taskId);
  }
}
