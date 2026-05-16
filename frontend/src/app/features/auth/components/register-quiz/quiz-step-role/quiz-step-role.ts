import { Component, output } from '@angular/core';
import { UserRole } from '@features/auth/models/register.model';

@Component({
  selector: 'app-quiz-step-role',
  imports: [],
  templateUrl: './quiz-step-role.html',
  styleUrl: './quiz-step-role.scss',
})
export class QuizStepRoleComponent {
  selected = output<UserRole>()
}
