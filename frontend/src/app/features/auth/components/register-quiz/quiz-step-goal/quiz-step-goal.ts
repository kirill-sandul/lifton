import { Component, input, output } from '@angular/core';
import { UserGoal, UserRole } from '@core/models/user.models';

@Component({
  selector: 'app-quiz-step-goal',
  imports: [],
  templateUrl: './quiz-step-goal.html'
})
export class QuizStepGoalComponent {
  readonly UserRole = UserRole;
  readonly UserGoal = UserGoal;

  role = input.required<UserRole>();
  selected = output<UserGoal>()
}
