import { ClientProfileWithUser, UserProfile } from '@core/models/user.models';
import { TrainingProgram } from '@core/models/training.models';

export type ClientProfileWhitelist = ClientProfileWithUser & {
  assignedToProgram: boolean;
  assignedToOtherProgram?: boolean;
};

export type TrainingProgramWhitelist = ClientProfileWhitelist[];

export interface AssignClientToProgramResponse {
  updatedPrograms: TrainingProgram[];
  updatedProfile: UserProfile;
}
