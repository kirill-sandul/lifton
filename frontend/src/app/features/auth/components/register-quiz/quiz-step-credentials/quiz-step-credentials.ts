import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { APP_ICONS } from '@core/icons';
import { RegisterCredentialsFormControls } from '@features/auth/models/auth.models';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { ButtonComponent } from "@shared/components/button/button";

@Component({
  selector: 'app-quiz-step-credentials',
  imports: [ReactiveFormsModule, BaseInputComponent, ButtonComponent, ...APP_ICONS],
  templateUrl: './quiz-step-credentials.html'
})
export class QuizStepCredentialsComponent {
  formGroup = input.required<FormGroup<RegisterCredentialsFormControls>>()

  onSubmit = output()
}
