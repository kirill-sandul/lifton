import { IsEmail, IsEnum, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";
import { Goal, Role } from "src/generated/prisma/enums";

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsPhoneNumber()
  phone!: string;

  @IsNumber()
  age!: number;

  @IsString()
  fullName!: string;

  @IsOptional()
  @IsString()
  pfp?: string;

  @ValidateIf(o => o.role === Role.CLIENT)
  @IsNumber()
  height!: number;
  
  @ValidateIf(o => o.role === Role.CLIENT)
  @IsNumber()
  bodyWeight!: number;

  @ValidateIf(o => o.role === Role.TRAINER)
  @IsOptional()
  @IsNumber()
  experience!: number;
  
  @MinLength(10)
  @MaxLength(400)
  description!: string;

  @IsEnum(Role)
  role!: Role;

  @IsEnum(Goal)
  goal!: Goal;

  @IsString()
  password!: string;
} 