// export type UserRole = 'TRAINER' | 'CLIENT';
// export type UserGoal = 'STRENGTH' | 'MUSCLES' | 'FATLOSS';

export enum UserRole {
  TRAINER = 'trainer',
  CLIENT = 'client'
}

export enum UserGoal {
  STRENGTH = 'strength',
  MUSCLES = 'muscle gain',
  FATLOSS = 'fat loss'
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  goal: UserGoal,
  age: number;
  pfpUrl?: string;
  description?: string;
  clientProfile?: {
    bodyWeight: number,
    height: number
  },
  trainerProfile?: {
    experience: number
  }
}

export interface EditProfileDto {
  role: UserRole;
  fullName?: string;
  email?: string;
  phone?: string;
  goal?: UserGoal,
  age?: number;
  pfpUrl?: string;
  description?: string;
  bodyWeight?: number,
  height?: number
  experience?: number
}