import { Component, input, output } from '@angular/core';
import { UserGoal, UserRole } from '@features/auth/models/auth.models';

@Component({
  selector: 'app-quiz-step-goal',
  imports: [],
  templateUrl: './quiz-step-goal.html'
})
export class QuizStepGoalComponent {
  role = input.required<UserRole>();
  selected = output<UserGoal>()
}
