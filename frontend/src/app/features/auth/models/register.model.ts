import { FormControl } from "@angular/forms";

export type UserRole = 'trainer' | 'client';
export type UserGoal = 'strength' | 'muscles' | 'fat-loss';

export interface BaseProfileFormControls {
  pfp: FormControl<File | null>
  age: FormControl<number | null>
  description: FormControl<string | null>
}

export interface ClientProfileFormControls extends BaseProfileFormControls {
  bodyWeight: FormControl<number | null>
  height: FormControl<number | null>
}

export interface TrainerProfileFormControls extends BaseProfileFormControls {
  experience: FormControl<number | null>
}

export type FullProfileFormControls = BaseProfileFormControls & ClientProfileFormControls & TrainerProfileFormControls

export interface RegisterCredentialsFormControls {
  phone: FormControl<string | null>
  email: FormControl<string | null>
  password: FormControl<string | null>
}

export interface RegistrationModel {
  role: UserRole,
  goal: UserGoal
}