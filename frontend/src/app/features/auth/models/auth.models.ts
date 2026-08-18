import { FormControl } from '@angular/forms';
import { UserGoal, UserRole } from '@core/models/user.models';

export interface BaseProfileFormControls {
  pfp: FormControl<File | null>;
  age: FormControl<number | null>;
  description: FormControl<string | null>;
}

export interface ClientProfileFormControls extends BaseProfileFormControls {
  bodyWeight: FormControl<number | null>;
  height: FormControl<number | null>;
}

export interface TrainerProfileFormControls extends BaseProfileFormControls {
  experience: FormControl<number | null>;
}

export type FullProfileFormControls = BaseProfileFormControls &
  ClientProfileFormControls &
  TrainerProfileFormControls;

export interface RegisterCredentialsFormControls {
  username: FormControl<string | null>;
  fullName: FormControl<string | null>;
  phone: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface RegistrationModel {
  role: UserRole;
  goal: UserGoal;
}

export interface LoginFormControls {
  identity: FormControl<string | null>;
  password: FormControl<string | null>;
}

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
