// export type UserRole = 'TRAINER' | 'CLIENT';
// export type UserGoal = 'STRENGTH' | 'MUSCLES' | 'FATLOSS';

export enum UserRole {
  TRAINER = 'TRAINER',
  CLIENT = 'CLIENT'
}

export enum UserGoal {
  STRENGTH = 'STRENGTH',
  MUSCLES = 'MUSCLES',
  FATLOSS = 'FATLOSS'
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
    height: number,
    assignedTrainer: UserProfile
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
