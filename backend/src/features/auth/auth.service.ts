import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StorageService } from 'src/core/modules/storage/storage.service';
import { PrismaService } from 'src/core/modules/prisma/prisma.service';
import { Role } from 'src/generated/prisma/enums';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private storageService: StorageService, private prisma: PrismaService){}

  async register(registerDto: RegisterDto, file?: Express.Multer.File){
    let pfpUrl: string | null = null;

    if(file) pfpUrl = await this.storageService.uploadFile(file, 'avatars');

    const { fullName, email, phone, role, age, description, password, bodyWeight, height, goal, experience } = registerDto;
    
    const hash = await bcrypt.hash(password, 10);

    const existingEmail = await this.prisma.user.findUnique({
      where: { email }
    })

    if(existingEmail) throw new ConflictException('EXISTING_EMAIL');

    const user = await this.prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        role,
        age,
        description,
        pfpUrl,
        goal,
        password: hash,
        clientProfile: role === Role.CLIENT ? {
          create: {
            bodyWeight,
            height
          }
        } : undefined,
        trainerProfile: role === Role.TRAINER ? {
          create: {
            experience
          }
        } : undefined
      } 
    });

    return await this.generateTokens(user.id, user.role);
  }

  async login(loginDto: LoginDto){
    const { email, password } = loginDto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } })
    if(!foundUser) throw new UnauthorizedException('INVALID_CREDENTIALS');

    const correctPass = await bcrypt.compare(password, foundUser.password);
    if(!correctPass) throw new UnauthorizedException('INVALID_CREDENTIALS');

    return await this.generateTokens(foundUser.id, foundUser.role)
  }

  async logout(refreshToken: string){
    if(!refreshToken) throw new UnauthorizedException("NO_TOKEN_FOR_LOGOUT");

    await this.prisma.refreshToken.deleteMany({
      where: {
        token: refreshToken
      }
    });
  }

  async refresh(refreshToken: string){
    if(!refreshToken) throw new UnauthorizedException();

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: {
        token: refreshToken
      }
    })

    if(!storedToken) throw new UnauthorizedException();
    
    if(storedToken.expiresAt < new Date()) {
      await this.prisma.refreshToken.delete({ where: {
        token: refreshToken
      } })

      throw new UnauthorizedException();
    }

    await this.prisma.refreshToken.update({
      where: { token: refreshToken }, 
      data: { expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
    })

    const payload = { sub: storedToken.userId, role: storedToken.role }
    const accessToken = this.jwtService.sign(payload);

    return { accessToken }
  }

  private async generateTokens(userId: string, role: Role){
    const payload = { sub: userId, role }

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = crypto.randomUUID();

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        role,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    })

    return { accessToken, refreshToken }
  }
}
