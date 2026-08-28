import { ClientProfileWithUser, UserProfile } from '@core/models/user.models';
import { TrainingProgramResponse } from '@core/api-contract/training.api';

export type ClientProfileWhitelist = ClientProfileWithUser & {
  assignedToProgram: boolean;
  assignedToOtherProgram?: boolean;
};

export type TrainingProgramWhitelist = ClientProfileWhitelist[];

export interface AssignClientToProgramResponse {
  updatedPrograms: TrainingProgramResponse[];
  updatedProfile: UserProfile;
}
