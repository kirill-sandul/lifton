import { Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_ICONS } from '@core/icons';
import { UserGoal, UserProfile, UserRole } from '@core/models/user.models';
import { UserService } from '@core/services/user.service';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { SelectInputComponent, SelectInputOption } from '@shared/components/select-input/select-input';
import { ModalComponent } from '@shared/components/modal/modal';
import { digitsOnlyValidator } from '@shared/validators/digitsOnly.validator';
import { phoneValidator } from '@shared/validators/phone.validator';
import { USER_GOAL_LABELS } from '@shared/constants/ui-mapping/user-goal.labels';

export interface EditProfileFormControls {
  pfp: FormControl<File | null>;
  fullName: FormControl<string | null>;
  age: FormControl<number | null>;
  bodyWeight: FormControl<number | null>;
  height: FormControl<number | null>;
  experience: FormControl<number | null>;
  goal: FormControl<UserGoal | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  description: FormControl<string | null>;
}

export interface EditProfileFormValues {
  pfp: File;
  fullName: string;
  age: number;
  bodyWeight: number;
  height: number;
  experience: number;
  goal: UserGoal;
  email: string;
  phone: string;
  description: string;
}

@Component({
  selector: 'app-edit-profile-modal',
  imports: [ModalComponent, BaseInputComponent, SelectInputComponent, ...APP_ICONS],
  templateUrl: './edit-profile-modal.html',
  styleUrl: './edit-profile-modal.scss',
})
export class EditProfileModalComponent {
  readonly UserRole = UserRole;

  userService = inject(UserService);

  userRole = input.required<UserRole>()
  defaultValues = input<UserProfile | null>();

  onClose = output();

  editProfileForm: FormGroup<EditProfileFormControls> = new FormGroup({
    pfp: new FormControl<File | null>(null),
    fullName: new FormControl<string | null>(null),
    age: new FormControl<number | null>(null, [
      digitsOnlyValidator(),
      Validators.min(1),
      Validators.max(120),
    ]),
    bodyWeight: new FormControl<number | null>(null, [
      digitsOnlyValidator(),
      Validators.min(20),
      Validators.max(300),
    ]),
    height: new FormControl<number | null>(null, [
      digitsOnlyValidator(),
      Validators.min(1),
      Validators.max(250),
    ]),
    experience: new FormControl<number | null>(null, [
      digitsOnlyValidator(),
      Validators.min(1),
      Validators.max(50),
    ]),
    goal: new FormControl<UserGoal | null>(null),
    email: new FormControl<string | null>(null, [
      Validators.email,
    ]),
    phone: new FormControl<string | null>(null, [
      phoneValidator(),
    ]),
    description: new FormControl<string | null>(null, [
      Validators.minLength(10),
      Validators.maxLength(400)
    ]),
  });

  selectGoalOptions: SelectInputOption[] = [
    {
      label: USER_GOAL_LABELS[UserGoal.STRENGTH],
      value: UserGoal.STRENGTH
    },
    {
      label: USER_GOAL_LABELS[UserGoal.MUSCLES],
      value: UserGoal.MUSCLES
    },
    {
      label: USER_GOAL_LABELS[UserGoal.FATLOSS],
      value: UserGoal.FATLOSS
    }
  ]

  constructor(){
    effect(() => {
      const profile = this.defaultValues();

      this.editProfileForm.patchValue({
        fullName: profile?.fullName,
        age: profile?.age,
        email: profile?.email,
        phone: profile?.phone,
        description: profile?.description,
        goal: profile?.goal
      })

      if(profile?.clientProfile){
        this.editProfileForm.patchValue({
          height: profile.clientProfile.height,
          bodyWeight: profile.clientProfile.bodyWeight
        })
      }
      else if(profile?.trainerProfile){
        this.editProfileForm.patchValue({
          experience: profile.trainerProfile.experience
        })
      }
    })
  }

  onSubmit(){
    const formValues = (this.editProfileForm.value as EditProfileFormValues);
    
    const profileChanges = { ...formValues, role: this.userRole() }

    this.userService.editProfile(profileChanges).subscribe({
      next: () => this.onClose.emit()
    })
  }
}
