import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Goal } from 'src/generated/prisma/enums';

export class EditUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsEnum(Goal)
  goal?: Goal;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  age?: number;

  @IsOptional()
  @IsString()
  pfpUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  bodyWeight?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  height?: number;

  @IsOptional()
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
