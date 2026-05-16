import { FormControl } from "@angular/forms";

export type UserRole = 'trainer' | 'client';
export type UserGoal = 'strength' | 'muscles' | 'fat-loss';

export interface RegisterFormControls {
  pfp: FormControl<File | null>;
  age: FormControl<number | null>;
  bodyWeight: FormControl<number | null>;
  height: FormControl<number | null>;
  description: FormControl<string | null>;
  phone: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface RegistrationModel {
  role: UserRole,
  goal: UserGoal
}