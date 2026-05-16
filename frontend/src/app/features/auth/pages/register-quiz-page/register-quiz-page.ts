import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizStepRoleComponent } from '@features/auth/components/register-quiz/quiz-step-role/quiz-step-role';
import { QuizStepGoalComponent } from '@features/auth/components/register-quiz/quiz-step-goal/quiz-step-goal';
import { QuizStepProfileComponent } from '@features/auth/components/register-quiz/quiz-step-profile/quiz-step-profile';
import { RegisterFormControls, RegistrationModel } from '@features/auth/models/register.model';
import { QuizStepCredentialsComponent } from '@features/auth/components/register-quiz/quiz-step-credentials/quiz-step-credentials';

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
      Validators.required
    ]),
    bodyWeight: new FormControl<number | null>(null, [
      Validators.required
    ]),
    height: new FormControl<number | null>(null, [
      Validators.required
    ]),
    description: new FormControl<string | null>(null, [
      Validators.required
    ]),
    phone: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
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
