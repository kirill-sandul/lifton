import { Pipe, PipeTransform } from "@angular/core";
import { UserGoal } from "@core/models/user.models";
import { USER_GOAL_LABELS } from "@shared/constants/ui-mapping/user-goal.labels";

@Pipe({
  name: 'userGoal'
})
export class UserGoalPipe implements PipeTransform {
  transform(value: UserGoal | null | undefined) {
    if(!value) return '';

    return USER_GOAL_LABELS[value] ?? value;
  }
}