import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { APP_ICONS } from '@core/icons';
import { FullProfileFormControls, UserRole } from '@features/auth/models/register.model';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { ButtonComponent } from '@shared/components/button/button';
import { FileInputComponent } from '@shared/components/file-input/file-input';

@Component({
  selector: 'app-quiz-step-profile',
  imports: [ReactiveFormsModule, ButtonComponent, FileInputComponent, BaseInputComponent, ...APP_ICONS],
  templateUrl: './quiz-step-profile.html',
})
export class QuizStepProfileComponent {
  role = input.required<UserRole>();
  formGroup = input.required<FormGroup<FullProfileFormControls>>()

  nextStep = output()
}
