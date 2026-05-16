import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizStepRoleComponent } from '@features/auth/components/register-quiz/quiz-step-role/quiz-step-role';
import { QuizStepGoalComponent } from '@features/auth/components/register-quiz/quiz-step-goal/quiz-step-goal';
import { QuizStepProfileComponent } from '@features/auth/components/register-quiz/quiz-step-profile/quiz-step-profile';
import { RegisterFormControls, RegistrationModel } from '@features/auth/models/register.model';
import { QuizStepCredentialsComponent } from '@features/auth/components/register-quiz/quiz-step-credentials/quiz-step-credentials';
import { phoneValidator } from '@shared/validators/phone.validator';
import { digitsOnlyValidator } from '@shared/validators/digitsOnly.validator';

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
  step = signal(1)

  registrationModel: RegistrationModel = {
    role: 'client',
    goal: 'strength'
  }

  registerForm: FormGroup<RegisterFormControls> = new FormGroup({
    pfp: new FormControl<File | null>(null, [
      Validators.required
    ]),
    age: new FormControl<number | null>(null, [
      digitsOnlyValidator(),
      Validators.min(1),
      Validators.max(120),
      Validators.required
    ]),
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
    experience: new FormControl<number | null>(null, [
      digitsOnlyValidator(),
      Validators.min(50),
      Validators.max(50),
      Validators.required
    ]),
    description: new FormControl<string | null>('', [
      Validators.minLength(10),
      Validators.maxLength(400)
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
    ]),
  })

  nextStep(){
    this.step.set(this.step() + 1)
  }

  onSubmit(){
    console.log(this.registerForm.value)
  }
}
