import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/modules/prisma/prisma.service';
import { StorageService } from 'src/core/modules/storage/storage.service';
import { EditUserDto } from './dto/user.dto';
import { Role } from 'src/generated/prisma/enums';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private storage: StorageService,
  ) {}

  async getProfile(userId: string) {
    const found = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { clientProfile: true, trainerProfile: true },
    });

    if (found && found.clientProfile) {
      const trainerId = found.clientProfile.assignedTrainerProfileId;
      if (!trainerId) return found;

      const trainerProfile = await this.prisma.trainerProfile.findUnique({
        where: { id: trainerId },
      });

      const resolvedTrainer = await this.prisma.user.findUnique({
        where: { id: trainerProfile?.userId },
        include: {
          trainerProfile: {
            include: {
              user: true,
            },
          },
        },
      });

      return {
        ...found,
        clientProfile: {
          ...found.clientProfile,
          assignedTrainer: resolvedTrainer,
        },
      };
    } else if (found && found.trainerProfile) {
      const trainerProfile = await this.prisma.trainerProfile.findUnique({
        where: { userId: found.id },
        include: {
          clients: {
            include: {
              user: true,
            },
          },
        },
      });

      return {
        ...found,
        trainerProfile,
      };
    } else throw new NotFoundException('Cannot get user profile');
  }

  async editPfp(userId: string, newImg: Express.Multer.File) {
    if (!newImg) throw new BadRequestException('No image uploaded');

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    let oldImgUrl = user?.pfpUrl;
    const newImgUrl = await this.storage.uploadFile(newImg, 'avatars');

    if (newImgUrl && oldImgUrl) {
      oldImgUrl = oldImgUrl.split('avatars/')[1];
      await this.storage.deleteFile(oldImgUrl);
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { pfpUrl: newImgUrl },
      include: { clientProfile: true, trainerProfile: true },
    });
  }

  async editProfile(userId: string, role: Role, editProfileDto: EditUserDto) {
    const {
      fullName,
      age,
      goal,
      phone,
      email,
      description,
      bodyWeight,
      height,
      experience,
    } = editProfileDto;

    const preparedFormat: { [key: string]: any } = {
      fullName,
      age,
      email,
      phone,
      description,
      goal,
      clientProfile:
        role === 'CLIENT'
          ? {
              update: {
                bodyWeight,
                height,
              },
            }
          : undefined,
      trainerProfile:
        role === 'TRAINER'
          ? {
              update: {
                experience,
              },
            }
          : undefined,
    };

    Object.keys(preparedFormat).forEach((key) => {
      if (preparedFormat[key] === null) preparedFormat[key] = undefined;
    });

    return this.prisma.user.update({
      where: { id: userId },
      data: { ...preparedFormat },
      include: { clientProfile: true, trainerProfile: true },
    });
  }
}
