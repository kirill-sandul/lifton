import { Injectable } from '@angular/core';
import { WorkoutRecordUi } from '@core/models/training.models';

@Injectable({
  providedIn: 'root',
})
export class WorkoutSessionService {
  _localStorageKey = 'workout-session' as const;

  saveToLocalStorage(workoutRecord: WorkoutRecordUi, durationSec: number) {
    localStorage.setItem(
      this._localStorageKey,
      JSON.stringify({
        ...workoutRecord,
        durationSec,
      }),
    );
  }

  getFromLocalStorage(): WorkoutRecordUi | null {
    const saved = localStorage.getItem(this._localStorageKey);

    if (!saved) return null;

    return JSON.parse(saved);
  }

  clearLocalStorage() {
    localStorage.removeItem(this._localStorageKey);
  }
}
