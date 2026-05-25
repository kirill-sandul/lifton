import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/modules/prisma/prisma.service';
import { EditUserDto } from './dto/user.dto';
import { Role } from 'src/generated/prisma/enums';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}

  async getProfile(userId: string){
    return await this.prisma.user.findUnique({
      where: { id: userId },
      include: { clientProfile: true, trainerProfile: true }
    })
  }
  
  async editProfile(userId: string, role: Role, editProfileDto: EditUserDto){
    const { fullName, age, goal, phone, email, description, bodyWeight, height, experience } = editProfileDto;

    const preparedFormat: {[key: string]: any} = {
      fullName,
      age,
      email,
      phone,
      description,
      goal,
      clientProfile: role === 'CLIENT' ? {
        update: {
          bodyWeight,
          height
        }
      } : undefined,
      trainerProfile: role === 'TRAINER' ? {
        update: {
          experience
        }
      } : undefined
    }
    
    Object.keys(preparedFormat).forEach(key => {
      if(preparedFormat[key] === null) preparedFormat[key] = undefined;
    })

    return await this.prisma.user.update({
      where: { id: userId },
      data: { ...preparedFormat }
    })
  }
}
