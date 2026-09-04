import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutSessionService } from '@features/workout-session/service/workout-session.service';
import { ClientService } from '@core/services/roles/client/client.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { ExerciseRecordUi, WeekDay, WorkoutRecordUi } from '@core/models/training.models';
import { WorkoutExerciseResponse, WorkoutResponse } from '@core/api-contract/training.api';
import { SNACKBAR_MSG_REGISTRY } from '@shared/constants/ui-mapping/snackbar-msg-registry';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WorkoutSessionFacade {
  router = inject(Router);
  workoutSessionService = inject(WorkoutSessionService);
  clientService = inject(ClientService);
  snackbarService = inject(SnackbarService);

  private readonly _workoutSession = signal<WorkoutResponse | null>(null);
  workoutSession = this._workoutSession.asReadonly();

  private readonly _currentExercise = signal<WorkoutExerciseResponse | null>(null);
  currentExercise = this._currentExercise.asReadonly();

  private readonly _workoutRecord = signal<WorkoutRecordUi>({
    name: '',
    durationSec: 0,
    day: WeekDay.MONDAY,
    exercises: [],
    originalWorkoutId: '',
  });
  workoutRecord = this._workoutRecord.asReadonly();

  durationSec = signal<number>(0);

  finishModalShow = signal(false);

  disabledSliderPrevButton = signal(false);
  disabledSliderNextButton = signal(false);

  currentExerciseRecord = computed<ExerciseRecordUi | null>(() => {
    const currentExerciseId = this._currentExercise()?.id;

    if (!currentExerciseId) return null;

    return this._workoutRecord().exercises.find((ex) => ex.id === currentExerciseId) || null;
  });

  init(workoutData: WorkoutResponse) {
    this._workoutSession.set(workoutData);
    this._currentExercise.set(workoutData.exercises[0]);

    const savedRecord = this.workoutSessionService.getFromLocalStorage();

    if (savedRecord && savedRecord.originalWorkoutId === workoutData.id) {
      this._workoutRecord.set(savedRecord);
      this.durationSec.set(savedRecord.durationSec);
    } else this.createEmptyRecord();
  }

  reset() {
    this._workoutSession.set(null);
    this._currentExercise.set(null);
    this._workoutRecord.set({
      name: '',
      durationSec: 0,
      day: WeekDay.MONDAY,
      exercises: [],
      originalWorkoutId: '',
    });
    this.durationSec.set(0);

    this.workoutSessionService.clearLocalStorage();
  }

  private createEmptyRecord() {
    const workoutSession = this._workoutSession();
    if (!workoutSession) return;

    this._workoutRecord.set({
      name: workoutSession.name,
      day: workoutSession.day,
      durationSec: 0,
      originalWorkoutId: workoutSession.id,
      exercises: workoutSession.exercises.map((exercise) => ({
        ...exercise,
        skipped: true,
        sets: exercise.sets.map((set) => ({
          ...set,
          executedReps: 0,
          executedValue: 0,
          targetValue: set.targetValue,
          targetReps: set.reps,
          skipped: true,
          _rTouched: false,
          _wTouched: false,
        })),
      })),
    });
  }

  saveToLocalStorage() {
    if (!this.workoutRecord().originalWorkoutId) return;

    this.workoutSessionService.saveToLocalStorage(this.workoutRecord(), this.durationSec());
  }

  setExercise(exerciseIdx: number) {
    const workoutSession = this._workoutSession();
    if (!workoutSession) return;

    this._currentExercise.set(workoutSession.exercises[exerciseIdx]);
  }

  recordSet(
    exerciseId: string,
    setIndex: number,
    field: 'executedValue' | 'executedReps',
    value: number,
  ) {
    this._workoutRecord.update((record) => ({
      ...record,
      exercises: record.exercises.map((ex) => {
        if (ex.id === exerciseId)
          return {
            ...ex,
            skipped: false,
            sets: ex.sets.map((set) => {
              const updatedTgValue = field === 'executedValue' ? value : set.executedValue;
              const updatedReps = field === 'executedReps' ? value : set.executedReps;

              const isCompleted = updatedTgValue > 0 && updatedReps > 0;

              if (set.index === setIndex)
                return {
                  ...set,
                  [field]: value,
                  skipped: !isCompleted,
                  [field === 'executedValue' ? '_wTouched' : '_rTouched']: true,
                };

              return set;
            }),
          };

        return ex;
      }),
    }));
  }

  skipSet(exerciseId: string, setIndex: number) {
    this._workoutRecord.update((record) => ({
      ...record,
      exercises: record.exercises.map((ex) => {
        if (ex.id === exerciseId)
          return {
            ...ex,
            skipped: false,
            sets: ex.sets.map((set) => {
              if (set.index === setIndex)
                return {
                  ...set,
                  executedValue: 0,
                  executedReps: 0,
                  _rTouched: true,
                  _wTouched: true,
                  skipped: true,
                };

              return set;
            }),
          };

        return ex;
      }),
    }));
  }

  skipExercise(exerciseId: string) {
    this._workoutRecord.update((record) => ({
      ...record,
      exercises: record.exercises.map((ex) => {
        if (ex.id === exerciseId)
          return {
            ...ex,
            skipped: true,
            sets: ex.sets.map((set) => ({
              ...set,
              executedValue: 0,
              executedReps: 0,
              _rTouched: true,
              _wTouched: true,
              skipped: true,
            })),
          };

        return ex;
      }),
    }));
  }

  toggleSetBlur(exerciseId: string, setIndex: number, blur: boolean) {
    this._workoutRecord.update((record) => ({
      ...record,
      exercises: record.exercises.map((ex) => {
        if (ex.id === exerciseId)
          return {
            ...ex,
            skipped: false,
            sets: ex.sets.map((set) => {
              if (set.index === setIndex)
                return {
                  ...set,
                  _wTouched: blur,
                  _rTouched: blur,
                };

              return set;
            }),
          };

        return ex;
      }),
    }));
  }

  finishWorkout() {
    this.clientService
      .submitWorkoutRecord({
        ...this.workoutRecord(),
        durationSec: this.durationSec(),
      })
      .subscribe({
        next: () => {
          this.finishModalShow.set(false);
          this.reset();

          this.router.navigate(['/']);
          this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.RECORD_WORKOUT_SESSION, 'success');
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.Conflict) {
            this.reset();
            this.router.navigate(['/']);
          }

          this.finishModalShow.set(false);
          this.snackbarService.newSnackbar(
            SNACKBAR_MSG_REGISTRY.RECORD_WORKOUT_SESSION_FAIL,
            'error',
          );
        },
      });
  }
}
