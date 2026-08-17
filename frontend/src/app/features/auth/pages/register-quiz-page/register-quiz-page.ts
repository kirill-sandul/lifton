import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@features/auth/services/auth.service';
import { QuizStepRoleComponent } from '@features/auth/components/register-quiz/quiz-step-role/quiz-step-role';
import { QuizStepGoalComponent } from '@features/auth/components/register-quiz/quiz-step-goal/quiz-step-goal';
import { QuizStepProfileComponent } from '@features/auth/components/register-quiz/quiz-step-profile/quiz-step-profile';
import {
  ClientProfileFormControls,
  TrainerProfileFormControls,
  RegisterCredentialsFormControls,
  RegistrationModel
} from '@features/auth/models/auth.models';
import { UserGoal, UserRole } from '@core/models/user.models';
import { QuizStepCredentialsComponent } from '@features/auth/components/register-quiz/quiz-step-credentials/quiz-step-credentials';
import { phoneValidator } from '@shared/validators/phone.validator';
import { digitsOnlyValidator } from '@shared/validators/digitsOnly.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-quiz-page',
  imports: [
    ReactiveFormsModule,
    QuizStepRoleComponent,
    QuizStepGoalComponent,
    QuizStepProfileComponent,
    QuizStepCredentialsComponent
  ],
  templateUrl: './register-quiz-page.html',
  styleUrl: './register-quiz-page.scss'
})
export class RegisterQuizPage {
  authService = inject(AuthService)
  router = inject(Router);

  step = signal(1)

  registrationModel: RegistrationModel = {
    role: UserRole.CLIENT,
    goal: UserGoal.STRENGTH
  }

  registerProfileForm: FormGroup = new FormGroup({});
  
  registerCredentialsForm = new FormGroup<RegisterCredentialsFormControls>({
    fullName: new FormControl<string | null>('', [
      Validators.required
    ]), 
    phone: new FormControl<string | null>('', [
      phoneValidator(),
      Validators.required
    ]),
    email: new FormControl<string | null>('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl<string | null>('', [
      Validators.required
    ])
  })

  buildProfileForm(): FormGroup {
    const baseFields = {
      pfp: new FormControl<File | null>(null),
      age: new FormControl<number | null>(null, [
        digitsOnlyValidator(),
        Validators.min(1),
        Validators.max(120),
        Validators.required
      ]),
       description: new FormControl<string | null>('', [
        Validators.minLength(10),
        Validators.maxLength(400)
      ]),
    }

    if(this.registrationModel.role === UserRole.CLIENT){
      return new FormGroup<ClientProfileFormControls>({
        ...baseFields,
        bodyWeight: new FormControl<number | null>(null, [
          digitsOnlyValidator(),
          Validators.min(20),
          Validators.max(300),
          Validators.required
        ]),
        height: new FormControl<number | null>(null, [
          digitsOnlyValidator(),
          Validators.min(1),
          Validators.max(250),
          Validators.required
        ]),
      })
    }

    // TRAINER
    return new FormGroup<TrainerProfileFormControls>({
      ...baseFields,
      experience: new FormControl<number | null>(null, [
        digitsOnlyValidator(),
        Validators.min(1),
        Validators.max(50),
        Validators.required
      ]),
    })
  }

  roleSelected($event: UserRole){
    this.registrationModel.role = $event;
    this.registerProfileForm = this.buildProfileForm();
    this.nextStep()
  }

  nextStep(){
    this.step.set(this.step() + 1);
  }

  checkEmailError({ error }: HttpErrorResponse){
    if(error.statusCode === 409 && error.message === 'EXISTING_EMAIL') {
      this.registerCredentialsForm.get('email')?.setErrors({
        serverEmailError: true
      })

      this.registerCredentialsForm.get('email')?.markAsTouched();
    }
  }

  onSubmit(){
    const registrationFinalModel = {
      ...this.registrationModel,
      ...this.registerProfileForm.value,
      ...this.registerCredentialsForm.value
    }

    this.authService.register(registrationFinalModel).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => this.checkEmailError(error)
    })
  }
}
