import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/modules/prisma/prisma.service';
import { StorageService } from 'src/core/modules/storage/storage.service';
import { EditUserDto } from './dto/user.dto';
import { Role } from 'src/generated/prisma/enums';
import { Prisma } from '../../generated/prisma/client';

type FoundUserWithProfile = Prisma.UserGetPayload<{
  omit: { password: true };
  include: { clientProfile: true; trainerProfile: true };
}>;

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private storage: StorageService,
  ) {}

  private async resolveClientProfile(user: FoundUserWithProfile) {
    const trainerId = user.clientProfile?.assignedTrainerProfileId;
    if (!trainerId) return user;

    const trainerProfile = await this.prisma.trainerProfile.findUnique({
      where: { id: trainerId },
    });

    const resolvedTrainer = await this.prisma.user.findUnique({
      where: { id: trainerProfile?.userId },
      omit: {
        password: true,
      },
      include: {
        trainerProfile: true,
      },
    });

    return {
      ...user,
      clientProfile: {
        ...user.clientProfile,
        assignedTrainer: resolvedTrainer,
      },
    };
  }

  private async resolveTrainerProfile(user: FoundUserWithProfile) {
    const trainerProfile = await this.prisma.trainerProfile.findUnique({
      where: { userId: user.id },
      include: {
        clients: {
          include: {
            user: {
              omit: {
                password: true,
              },
            },
          },
        },
      },
    });

    return {
      ...user,
      trainerProfile,
    };
  }

  async getProfile(userId: string) {
    const found = await this.prisma.user.findUnique({
      where: { id: userId },
      omit: {
        password: true,
      },
      include: {
        clientProfile: true,
        trainerProfile: true,
      },
    });

    if (!found) throw new NotFoundException('Cannot get user profile');

    if (found.clientProfile) {
      return this.resolveClientProfile(found);
    } else if (found.trainerProfile) {
      return this.resolveTrainerProfile(found);
    }
  }

  async getProfileByUsername(username: string) {
    const found = await this.prisma.user.findUnique({
      where: { usernameCanonical: username.toLowerCase() },
      omit: {
        password: true,
      },
      include: {
        clientProfile: true,
        trainerProfile: true,
      },
    });

    if (!found) throw new NotFoundException('Cannot get user profile');

    if (found.clientProfile) {
      return this.resolveClientProfile(found);
    } else if (found.trainerProfile) {
      return this.resolveTrainerProfile(found);
    }
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

  async editProfile(userId: string, editProfileDto: EditUserDto) {
    const {
      fullName,
      age,
      role,
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

  async editUsername(userId: string, newUsername: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('USER_NOT_FOUND');

    if (user.lastUsernameChangeAt) {
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      const timePassed = Date.now() - user.lastUsernameChangeAt.getTime();

      if (timePassed < thirtyDaysMs) {
        const daysLeft = Math.ceil(
          (thirtyDaysMs - timePassed) / (24 * 60 * 60 * 1000),
        );

        throw new ForbiddenException({
          message: 'USERNAME_CHANGE_TIME_LIMIT',
          daysLeft,
        });
      }
    }

    const newUsernameCanonical = newUsername.toLowerCase();

    const isTaken = await this.prisma.user.findFirst({
      where: {
        usernameCanonical: newUsernameCanonical,
        NOT: { id: userId },
      },
    });

    if (isTaken) throw new ConflictException('EXISTING_USERNAME');

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        username: newUsername,
        usernameCanonical: newUsernameCanonical,
        lastUsernameChangeAt: new Date(),
      },
    });

    return this.getProfile(userId);
  }
}
