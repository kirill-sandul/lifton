import { Component, output } from '@angular/core';
import { UserRole } from '@core/models/user.models';

@Component({
  selector: 'app-quiz-step-role',
  imports: [],
  templateUrl: './quiz-step-role.html'
})
export class QuizStepRoleComponent {
  readonly UserRole = UserRole;
  selected = output<UserRole>()
}
