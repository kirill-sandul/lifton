import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { CreateProgramDto } from './dto/create-program.dto';
import { CurrentUser } from '../../core/decorators/current-user.decorator';

@Controller('programs')
@UseGuards(JwtGuard)
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Post('create')
  @Roles('TRAINER')
  @UseGuards(RoleGuard)
  createProgram(
    @CurrentUser() user: { sub: string },
    @Body() createProgramDto: CreateProgramDto,
  ) {
    return this.programsService.createProgram(user.sub, createProgramDto);
  }
}
