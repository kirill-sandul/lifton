import { UserGoal, UserRole } from '@core/models/user.models';

export interface RegisterDto {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  goal: UserGoal;
  age: number;
  pfpUrl?: string;
  description?: string;
  bodyWeight?: number;
  height?: number;
  experience?: number;
}

export interface LoginDto {
  identity: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}
