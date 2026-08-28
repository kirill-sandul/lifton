import { UserGoal, UserRole } from '@core/models/user.models';

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
