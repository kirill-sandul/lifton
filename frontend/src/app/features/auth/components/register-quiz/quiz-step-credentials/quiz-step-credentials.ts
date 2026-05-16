import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { APP_ICONS } from '@core/icons';
import { RegisterFormControls, UserRole } from '@features/auth/models/register.model';
import { BaseInputComponent } from '@shared/components/base-input/base-input';

@Component({
  selector: 'app-quiz-step-credentials',
  imports: [ReactiveFormsModule, BaseInputComponent, ...APP_ICONS],
  templateUrl: './quiz-step-credentials.html',
  styleUrl: './quiz-step-credentials.scss',
})
export class QuizStepCredentialsComponent {
  formGroup = input.required<FormGroup<RegisterFormControls>>()

  onSubmit = output()
}
