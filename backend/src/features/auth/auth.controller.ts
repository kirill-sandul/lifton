import { Body, Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('register')
  register(@Body() dto: RegisterDto){
    return this.authService.register(dto);
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
