import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/core/guards/jwt.guard';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { Role } from 'src/generated/prisma/enums';
import { EditUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}
  
  @Get('getProfile')
  @UseGuards(JwtGuard)
  getProfile(@CurrentUser() user: { sub: string, role: Role }){
    return this.userService.getProfile(user.sub);
  }

  @Patch('editProfile')
  @UseGuards(JwtGuard)
  editProfile(@CurrentUser() user: { sub: string, role: Role }, @Body() dto: EditUserDto){
    return this.userService.editProfile(user.sub, user.role, dto);
  }
}
