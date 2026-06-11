import { Notification } from '@core/models/notification.models';

export enum UserRole {
  TRAINER = 'TRAINER',
  CLIENT = 'CLIENT',
}

export enum UserGoal {
  STRENGTH = 'STRENGTH',
  MUSCLES = 'MUSCLES',
  FATLOSS = 'FATLOSS',
}

export interface UserProfile {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  goal: UserGoal;
  age: number;
  pfpUrl?: string;
  description?: string;
  active: boolean;
  receivedNotifications: Notification[];
  clientProfile?: ClientProfile;
  trainerProfile?: TrainerProfile;
}

export interface ClientProfile {
  bodyWeight: number;
  height: number;
  assignedTrainer: UserProfile;
  assignedAt: Date;
  trainingProgramId: string;
}

export type TrainerClients = (ClientProfile & { user: UserProfile })[];

export interface TrainerProfile {
  experience: number;
  clients: TrainerClients;
}

export interface EditProfileDto {
  role: UserRole;
  fullName?: string;
  email?: string;
  phone?: string;
  goal?: UserGoal;
  age?: number;
  pfpUrl?: string;
  description?: string;
  bodyWeight?: number;
  height?: number;
  experience?: number;
}

export interface UserToInvite {
  id: string;
  fullName: string;
}
