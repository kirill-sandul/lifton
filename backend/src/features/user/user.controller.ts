import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/core/guards/jwt.guard';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { Role } from 'src/generated/prisma/enums';
import { EditUserDto, EditUsernameDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getProfile')
  @UseGuards(JwtGuard)
  getProfile(@CurrentUser() user: { sub: string; role: Role }) {
    return this.userService.getProfile(user.sub);
  }

  @Get('getProfile/:username')
  @UseGuards(JwtGuard)
  getProfileByUsername(@Param('username') username: string) {
    return this.userService.getProfileByUsername(username);
  }

  @Post('editPfp')
  @UseInterceptors(FileInterceptor('newImg'))
  @UseGuards(JwtGuard)
  editPfp(
    @UploadedFile() newImg: Express.Multer.File,
    @CurrentUser() user: { sub: string },
  ) {
    return this.userService.editPfp(user.sub, newImg);
  }

  @Patch('editProfile')
  @UseGuards(JwtGuard)
  editProfile(@CurrentUser() user: { sub: string }, @Body() dto: EditUserDto) {
    return this.userService.editProfile(user.sub, dto);
  }

  @Patch('editUsername')
  @UseGuards(JwtGuard)
  editUsername(
    @CurrentUser() user: { sub: string },
    @Body() dto: EditUsernameDto,
  ) {
    return this.userService.editUsername(user.sub, dto.newUsername);
  }
}
