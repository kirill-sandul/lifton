import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Goal, Role } from 'src/generated/prisma/enums';

export class EditUserDto {
  @IsNotEmpty()
  @IsString()
  fullName?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone?: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role!: Role;

  @IsNotEmpty()
  @IsEnum(Goal)
  goal?: Goal;

  @Min(1)
  @IsNumber()
  @Type(() => Number)
  age?: number;

  @IsString()
  description?: string;

  @ValidateIf((o) => o.role === Role.CLIENT)
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  bodyWeight?: number;

  @ValidateIf((o) => o.role === Role.CLIENT)
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  height?: number;

  @ValidateIf((o) => o.role === Role.TRAINER)
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  experience?: number;
}

export class EditUsernameDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  @Matches(/^[a-zA-Z][a-zA-Z0-9_-]*$/)
  newUsername: string;
}
