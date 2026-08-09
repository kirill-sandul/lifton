import { inject, Injectable } from '@angular/core';
import { TrainingProgram } from '@core/models/training.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  http = inject(HttpClient);

  createProgram(programModel: TrainingProgram) {
    return this.http.post('programs/create', programModel);
  }
}
