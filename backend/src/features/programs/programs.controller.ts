import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { CreateProgramDto } from './dto/create-program.dto';
import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { Role } from '../../generated/prisma/enums';
import { UserService } from '../user/user.service';

@Controller('programs')
@UseGuards(JwtGuard)
export class ProgramsController {
  constructor(
    private programsService: ProgramsService,
    private userService: UserService,
  ) {}

  @Get('get')
  @Roles(Role.TRAINER)
  @UseGuards(RoleGuard)
  getTrainerPrograms(@CurrentUser() user: { sub: string }) {
    return this.programsService.getTrainerPrograms(user.sub);
  }

  @Patch(':programId/assign')
  @Roles(Role.TRAINER)
  @UseGuards(RoleGuard)
  async assignClientToProgram(
    @CurrentUser() user: { sub: string },
    @Param('programId') programId: string,
    @Body() dto: { clientId: string },
  ) {
    const updatedPrograms = await this.programsService.assignClient(
      programId,
      dto.clientId,
      user.sub,
    );
    const updatedProfile = await this.userService.getProfile(user.sub);

    return { updatedPrograms, updatedProfile };
  }

  @Patch(':programId/remove')
  @Roles(Role.TRAINER)
  @UseGuards(RoleGuard)
  async removeClientFromProgram(
    @CurrentUser() user: { sub: string },
    @Param('programId') programId: string,
    @Body() dto: { clientId: string },
  ) {
    const updatedPrograms = await this.programsService.removeClient(
      programId,
      dto.clientId,
      user.sub,
    );
    const updatedProfile = await this.userService.getProfile(user.sub);

    return { updatedPrograms, updatedProfile };
  }

  @Post('create')
  @Roles(Role.TRAINER)
  @UseGuards(RoleGuard)
  createProgram(
    @CurrentUser() user: { sub: string },
    @Body() createProgramDto: CreateProgramDto,
  ) {
    return this.programsService.createProgram(user.sub, createProgramDto);
  }
}
