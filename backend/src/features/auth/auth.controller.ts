import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import 'multer'
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('register')
  @UseInterceptors(FileInterceptor('pfp'))
  register(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: RegisterDto
  ){
    return this.authService.register(dto, file);
  }

  @Post('login')
  login(@Body() dto: LoginDto){
    return this.authService.login(dto);
  }

  @Post('logout')
  logout(@Req() req: Request){
    return this.authService.logout(req.cookies["refresh_token"]);
  }

  @Post('refresh')
  refresh(@Req() req: Request){
    return this.authService.refresh(req.cookies["refresh_token"]);
  } 
}
