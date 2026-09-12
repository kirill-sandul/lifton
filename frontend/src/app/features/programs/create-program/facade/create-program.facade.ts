import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Exercise,
  ProgramWeek,
  Target,
  TrainingCycle,
  Workout,
} from '@core/models/training.models';
import { ProgramsService } from '@features/programs/services/programs.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { SNACKBAR_MSG_REGISTRY } from '@shared/constants/ui-mapping/snackbar-msg-registry';
import {
  ExercisesTemporalMap,
  TrainingProgramDraft,
} from '@features/programs/create-program/models/create-program.models';
import { AutocompleteInputList } from '@core/models/ui.models';

@Injectable({
  providedIn: 'root',
})
export class CreateProgramFacade {
  programsService = inject(ProgramsService);
  snackbarService = inject(SnackbarService);
  router = inject(Router);

  private localStorageKey = 'create-program-draft' as const;
  private localStorageExercisesMapKey = 'create-program-exercises-map' as const;

  private readonly _trainingProgramModel = signal<TrainingProgramDraft>({
    name: '',
    cycle: TrainingCycle.WEEK,
    startDate: null,
    endDate: null,
    weeks: [{ workouts: [] }],
    targets: [],
  });
  readonly trainingProgramModel = this._trainingProgramModel.asReadonly();

  trainingProgramValidation = signal({
    baseInfoInvalid: true,
    dateRangeInvalid: computed(() => {
      const startDate = this._trainingProgramModel().startDate;
      const endDate = this._trainingProgramModel().endDate;

      if (startDate && endDate) {
        if (!this.isValidDateRange(startDate, endDate)) return true;
      } else if (!startDate && !endDate) return true;

      return false;
    }),
    scheduleInvalid: computed<boolean>(() => {
      let invalid = false;
      this._trainingProgramModel().weeks.forEach((w) => {
        if (!w.workouts.length) invalid = true;
      });

      return invalid;
    }),
  });

  private readonly _exercisesMap = signal<ExercisesTemporalMap>({});
  readonly exercisesMap = this._exercisesMap.asReadonly();
  readonly exercisesMapAutocomplete = computed(() => {
    const mapToArr: AutocompleteInputList = [];

    Object.keys(this._exercisesMap()).forEach((exercise) => {
      const exerciseData = this._exercisesMap()[exercise];
      mapToArr.push({
        name: exerciseData.name,
        previewProp: exerciseData.unit,
        props: {
          unit: exerciseData.unit,
        },
      });
    });

    return mapToArr;
  });

  isProgramInvalid = computed<boolean>(
    () =>
      this.trainingProgramValidation().baseInfoInvalid ||
      this.trainingProgramValidation().dateRangeInvalid() ||
      this.trainingProgramValidation().scheduleInvalid(),
  );

  constructor() {
    effect(() => {
      const trainingProgramModel = this._trainingProgramModel();

      // this.saveExercisesMap();
    });
  }

  private getWeeksCount(cycle: TrainingCycle): number {
    switch (cycle) {
      case TrainingCycle.WEEK:
        return 1;
      case TrainingCycle.TWO_WEEKS:
        return 2;
      case TrainingCycle.THREE_WEEKS:
        return 3;
      case TrainingCycle.FOUR_WEEKS:
        return 4;
      default:
        return 1;
    }
  }

  private normalizeExerciseName(rawName: string): string {
    if (!rawName) return '';

    return rawName
      .toLowerCase()
      .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private getExercisesMapKey(rawName: string, unit: string): string {
    const normalizedName = this.normalizeExerciseName(rawName);
    return `${normalizedName}.${unit}`;
  }

  minProgramDays(): number {
    switch (this._trainingProgramModel().cycle) {
      case TrainingCycle.WEEK:
        return 7;

      case TrainingCycle.TWO_WEEKS:
        return 14;

      case TrainingCycle.THREE_WEEKS:
        return 21;

      case TrainingCycle.FOUR_WEEKS:
        return 28;

      default:
        return 7;
    }
  }

  isValidDateRange(start: Date, end: Date): boolean {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    const startDate = new Date(start);
    const endDate = new Date(end);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const days = Math.floor((endDate.getTime() - startDate.getTime()) / MS_PER_DAY) + 1;

    return days >= this.minProgramDays();
  }

  setProgramName(name: string) {
    this._trainingProgramModel.update((p) => ({
      ...p,
      name,
    }));
  }

  setProgramCycle(cycle: TrainingCycle) {
    const weeksCount = this.getWeeksCount(cycle);
    const emptyWeek = { workouts: [] };

    this._trainingProgramModel.update((p) => {
      const oldWeeks = p.weeks;

      const newWeeks = Array.from({ length: weeksCount }, (_, idx) => {
        return oldWeeks[idx] ?? emptyWeek;
      });

      return {
        ...p,
        cycle,
        weeks: newWeeks,
      };
    });
  }

  setDateRange(start: Date, end: Date) {
    this._trainingProgramModel.update((p) => ({
      ...p,
      startDate: start,
      endDate: end,
    }));
  }

  rebuildExercisesMap() {
    Object.values(this._exercisesMap()).forEach((exerciseInMap) => {
      const allExercises = this._trainingProgramModel().weeks.flatMap((week) => {
        return week.workouts.flatMap((workout) => {
          return workout.exercises.flatMap((exercise) => exercise);
        });
      });

      const atLeastOneRef = allExercises.find((ex) => ex.tempId === exerciseInMap.tempId);
      if (!atLeastOneRef) {
        this.removeExerciseFromMap(this.getExercisesMapKey(exerciseInMap.name, exerciseInMap.unit));

        this._trainingProgramModel.update((p) => ({
          ...p,
          targets: p.targets.filter((t) => {
            return t.exerciseTempId !== exerciseInMap.tempId;
          }),
        }));
      }
    });
  }

  saveExercisesInMap(exercises: Exercise[]) {
    exercises.forEach((ex) => {
      const preparedKey = this.getExercisesMapKey(ex.name, ex.unit);
      const recordedInMap = this._exercisesMap()[preparedKey];

      if (!recordedInMap) {
        this._exercisesMap.update((m) => ({
          ...m,
          [preparedKey]: {
            tempId: crypto.randomUUID(),
            name: this.normalizeExerciseName(ex.name),
            unit: ex.unit,
          },
        }));
      }
    });
  }

  removeExerciseFromMap(key: string) {
    const { [key]: _discarded, ...filteredMap } = this._exercisesMap();

    this._exercisesMap.update(() => filteredMap);
  }

  addWorkout(weekIndex: number, workoutModel: Workout) {
    this._trainingProgramModel.update((program) => {
      const weeks = program.weeks;

      this.saveExercisesInMap(workoutModel.exercises);

      weeks[weekIndex] = {
        ...weeks[weekIndex],
        workouts: [
          ...weeks[weekIndex].workouts,
          {
            ...workoutModel,
            exercises: workoutModel.exercises.map((ex, idx) => {
              const existingKey = this.getExercisesMapKey(ex.name, ex.unit);
              const correspondingTempId = this._exercisesMap()[existingKey].tempId;

              return {
                ...ex,
                tempId: correspondingTempId,
                order: idx + 1,
                name: this.normalizeExerciseName(ex.name),
              };
            }),
          },
        ],
      };

      return {
        ...program,
        weeks,
      };
    });
  }

  editWorkout(weekIndex: number, editWorkoutIdx: number, data: Workout) {
    this.saveExercisesInMap(data.exercises);

    const normalizedData: Workout = {
      ...data,
      exercises: data.exercises.map((ex) => ({
        ...ex,
        tempId: this._exercisesMap()[this.getExercisesMapKey(ex.name, ex.unit)].tempId,
        name: this.normalizeExerciseName(ex.name),
      })),
    };

    this._trainingProgramModel.update((p) => ({
      ...p,
      weeks: p.weeks.map((week, idx) =>
        idx === weekIndex
          ? {
              ...week,
              workouts: week.workouts.map((w, idx) =>
                idx === editWorkoutIdx ? normalizedData : w,
              ),
            }
          : week,
      ),
    }));

    this.rebuildExercisesMap();
  }

  removeWorkout(weekIndex: number, workoutIndex: number) {
    let exTempIdsToRemove: string[] = [];

    this._trainingProgramModel.update((p) => ({
      ...p,
      weeks: p.weeks.map((week, idx) => {
        const workoutToBeRemoved = week.workouts.find((_, index) => index === workoutIndex);

        if (workoutToBeRemoved) {
          workoutToBeRemoved.exercises.forEach((ex) => {
            if (ex.tempId) {
              exTempIdsToRemove.push(ex.tempId ?? '');
              this.removeExerciseFromMap(ex.tempId);
            }
          });
        }

        return idx === weekIndex
          ? {
              ...week,
              workouts: week.workouts.filter((_, idx) => idx !== workoutIndex),
            }
          : week;
      }),
    }));

    // remove targets corresponding to removed workouts
    this.rebuildExercisesMap();
  }

  addTarget(targetModel: Target) {
    this._trainingProgramModel.update((p) => ({
      ...p,
      targets: [...p.targets, targetModel],
    }));
  }

  editTarget(editTargetIdx: number, data: Target) {
    this._trainingProgramModel.update((p) => ({
      ...p,
      targets: p.targets.map((t, idx) => (idx === editTargetIdx ? data : t)),
    }));
  }

  removeTarget(targetIndex: number) {
    this._trainingProgramModel.update((p) => ({
      ...p,
      targets: p.targets.filter((_, idx) => idx !== targetIndex),
    }));
  }

  saveProgramModel() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this._trainingProgramModel()));
    localStorage.setItem(this.localStorageExercisesMapKey, JSON.stringify(this._exercisesMap()));
  }

  loadProgramDraft() {
    const draft = localStorage.getItem(this.localStorageKey);
    const exercisesMap = localStorage.getItem(this.localStorageExercisesMapKey);

    if (draft) {
      const draftJson = JSON.parse(draft);
      this._trainingProgramModel.set(draftJson);
    }

    if (exercisesMap) {
      const exercisesJson = JSON.parse(exercisesMap);
      this._exercisesMap.set(exercisesJson);
    }
  }

  removeProgramDraft() {
    localStorage.removeItem(this.localStorageKey);
    localStorage.removeItem(this.localStorageExercisesMapKey);
  }

  createProgram() {
    if (this.isProgramInvalid()) return;

    this.programsService.createProgram(this.trainingProgramModel()).subscribe({
      next: () => {
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.PROGRAM_CREATE, 'success');
        this.removeProgramDraft();
        this.router.navigateByUrl('/programs');
      },
      error: () => {
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.PROGRAM_CREATE_FAIL, 'error');
      },
    });
  }
}
