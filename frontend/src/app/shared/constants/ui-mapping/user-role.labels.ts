import { UserRole } from "@core/models/user.models";

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.CLIENT]: 'Client',
  [UserRole.TRAINER]: 'Trainer'
}