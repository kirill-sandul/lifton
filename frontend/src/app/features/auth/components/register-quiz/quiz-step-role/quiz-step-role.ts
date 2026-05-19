import { Component, output } from '@angular/core';
import { UserRole } from '@features/auth/models/auth.models';

@Component({
  selector: 'app-quiz-step-role',
  imports: [],
  templateUrl: './quiz-step-role.html'
})
export class QuizStepRoleComponent {
  selected = output<UserRole>()
}
