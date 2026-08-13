import { computed, inject, Injectable, signal } from '@angular/core';
import { ProgramsService } from '@features/programs/services/programs.service';
import { TrainerService } from '@core/services/roles/trainer/trainer.service';
import { UserService } from '@core/services/user/user.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import {
  ClientProfileWhitelist,
  TrainingProgramWhitelist,
} from '@features/programs/programs-lib/models/programs-lib.models';
import { SNACKBAR_MSG_REGISTRY } from '@shared/constants/ui-mapping/snackbar-msg-registry';

@Injectable({
  providedIn: 'root',
})
export class ProgramsLibFacade {
  programsService = inject(ProgramsService);
  trainerService = inject(TrainerService);
  userService = inject(UserService);
  snackbarService = inject(SnackbarService);

  programs = computed(() => this.programsService.programs());

  selectedProgramId = signal<string | null>(null);

  selectedProgram = computed(
    () => this.programs().filter((p) => p.id === this.selectedProgramId())[0],
  );

  selectedProgramWhitelist = computed<TrainingProgramWhitelist>(() => {
    const whitelist: TrainingProgramWhitelist = [];

    this.trainerService.clients().forEach((client) => {
      if (this.selectedProgram()) {
        if (client.trainingProgramId === this.selectedProgram()!.id)
          whitelist.push({ ...client, assignedToProgram: true });
        else if (
          client.trainingProgramId !== this.selectedProgram()!.id &&
          client.trainingProgramId !== null
        ) {
          whitelist.push({ ...client, assignedToProgram: false, assignedToOtherProgram: true });
        } else whitelist.push({ ...client, assignedToProgram: false });
      }
    });

    return whitelist.sort((a, b) => {
      const priority = (client: ClientProfileWhitelist) => {
        if (client.assignedToProgram) return 0;
        else if (client.assignedToOtherProgram) return 2;
        return 1;
      };

      return priority(a) - priority(b);
    });
  });

  init() {
    this.programsService.getTrainingPrograms().subscribe();
  }

  selectProgramId(id: string) {
    this.selectedProgramId.set(id);
  }

  assignClient(clientId: string) {
    if (!this.selectedProgram() || this.programsService.isLoading()) return;

    const programId = this.selectedProgram()!.id;

    this.programsService.assignClient(programId, clientId).subscribe({
      next: ({ updatedPrograms, updatedProfile }) => {
        this.userService.updateProfile(updatedProfile);
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.ASSIGN_CLIENT_TO_PROGRAM, 'success');
      },
      error: () =>
        this.snackbarService.newSnackbar(
          SNACKBAR_MSG_REGISTRY.ASSIGN_CLIENT_TO_PROGRAM_FAIL,
          'error',
        ),
    });
  }

  removeClient(clientId: string) {
    if (!this.selectedProgram() || this.programsService.isLoading()) return;

    const programId = this.selectedProgram()!.id;

    this.programsService.removeClient(programId, clientId).subscribe({
      next: ({ updatedPrograms, updatedProfile }) => {
        this.userService.updateProfile(updatedProfile);
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.ASSIGN_CLIENT_TO_PROGRAM, 'success');
      },
      error: () =>
        this.snackbarService.newSnackbar(
          SNACKBAR_MSG_REGISTRY.REMOVE_CLIENT_FROM_PROGRAM_FAIL,
          'error',
        ),
    });
  }
}
