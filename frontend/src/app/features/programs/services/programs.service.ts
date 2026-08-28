import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs';
import { TrainingProgramDraft } from '@features/programs/create-program/models/create-program.models';
import { AssignClientToProgramResponse } from '@features/programs/programs-lib/models/programs-lib.models';
import { TrainingProgramResponse } from '@core/api-contract/training.api';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  http = inject(HttpClient);

  private readonly _programs = signal<TrainingProgramResponse[]>([]);
  readonly programs = this._programs.asReadonly();

  isLoading = signal<boolean>(false);

  getTrainingPrograms() {
    return this.http
      .get<TrainingProgramResponse[]>('programs/get')
      .pipe(tap((programs) => this._programs.set(programs)));
  }

  assignClient(programId: string, clientId: string) {
    this.isLoading.set(true);

    return this.http
      .patch<AssignClientToProgramResponse>(`programs/${programId}/assign`, {
        clientId,
      })
      .pipe(
        tap(({ updatedPrograms }) => {
          this._programs.set(updatedPrograms);
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      );
  }

  removeClient(programId: string, clientId: string) {
    this.isLoading.set(true);

    return this.http
      .patch<AssignClientToProgramResponse>(`programs/${programId}/remove`, {
        clientId,
      })
      .pipe(
        tap(({ updatedPrograms }) => {
          this._programs.set(updatedPrograms);
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      );
  }

  createProgram(programModel: TrainingProgramDraft) {
    return this.http.post('programs/create', programModel);
  }
}
