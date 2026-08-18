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
  ValidateIf,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Goal, Role } from 'src/generated/prisma/enums';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  @Matches(/^[a-zA-Z][a-zA-Z0-9_-]*$/)
  username!: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email!: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone!: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  age!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  fullName!: string;

  @IsOptional()
  @IsString()
  pfpUrl?: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role!: Role;

  @ValidateIf((o) => o.role === Role.CLIENT)
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  height!: number;

  @ValidateIf((o) => o.role === Role.CLIENT)
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  bodyWeight!: number;

  @ValidateIf((o) => o.role === Role.TRAINER)
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  experience!: number;

  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  @MinLength(10)
  @MaxLength(400)
  description?: string;

  @IsEnum(Goal)
  @IsNotEmpty()
  goal!: Goal;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
