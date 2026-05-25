import { Body, Controller, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request, Response } from 'express';
import 'multer'
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  private setRefreshCookie(res: Response, refreshToken: string){
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('pfp'))
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response
  ){
    const { accessToken, refreshToken } = await this.authService.register(dto, file);

    this.setRefreshCookie(res, refreshToken);

    return { accessToken }
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response){
    const { accessToken, refreshToken } = await this.authService.login(dto);

    this.setRefreshCookie(res, refreshToken);

    return { accessToken }
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response){
    await this.authService.logout(req.cookies["refresh_token"]);

    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: 'lax',
      secure: true
    })

    return { logoutSuccess: true }
  }

  @Post('refresh')
  async refresh(@Req() req: Request){
    const { accessToken } = await this.authService.refresh(req.cookies["refresh_token"]);

    return { accessToken }
  }
}
