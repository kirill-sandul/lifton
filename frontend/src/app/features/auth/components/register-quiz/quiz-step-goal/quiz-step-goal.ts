import { Component, input, output } from '@angular/core';
import { UserGoal, UserRole } from '@features/auth/models/register.model';

@Component({
  selector: 'app-quiz-step-goal',
  imports: [],
  templateUrl: './quiz-step-goal.html',
  styleUrl: './quiz-step-goal.scss',
})
export class QuizStepGoalComponent {
  role = input.required<UserRole>();
  selected = output<UserGoal>()
}
