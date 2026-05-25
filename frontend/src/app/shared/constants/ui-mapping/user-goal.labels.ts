import { UserGoal } from "@core/models/user.models";

export const USER_GOAL_LABELS: Record<UserGoal, string> = {
  [UserGoal.STRENGTH]: 'Strength',
  [UserGoal.MUSCLES]: 'Muscle gain',
  [UserGoal.FATLOSS]: 'Fat loss'
}