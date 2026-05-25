import { IsEmail, IsEnum, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";
import { Transform, Type } from "class-transformer";
import { Goal, Role } from "src/generated/prisma/enums";

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsPhoneNumber()
  phone!: string;

  @IsNumber()
  @Type(() => Number)
  age!: number;

  @IsString()
  fullName!: string;

  @IsOptional()
  @IsString()
  pfpUrl?: string;

  @IsEnum(Role)
  role!: Role;

  @ValidateIf(o => o.role === Role.CLIENT)
  @IsNumber()
  @Type(() => Number)
  height!: number;
  
  @ValidateIf(o => o.role === Role.CLIENT)
  @IsNumber()
  @Type(() => Number)
  bodyWeight!: number;

  @ValidateIf(o => o.role === Role.TRAINER)
  @IsNumber()
  @Type(() => Number)
  experience!: number;
  
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsOptional()
  @MinLength(10)
  @MaxLength(400)
  description?: string;

  @IsEnum(Goal)
  goal!: Goal;

  @IsString()
  password!: string;
} 