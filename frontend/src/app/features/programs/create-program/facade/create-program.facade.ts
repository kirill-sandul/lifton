import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Target, TrainingCycle, Workout } from '@core/models/training.models';
import { ProgramsService } from '@features/programs/services/programs.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { SNACKBAR_MSG_REGISTRY } from '@shared/constants/ui-mapping/snackbar-msg-registry';
import { TrainingProgramDraft } from '@features/programs/create-program/models/create-program.models';

@Injectable({
  providedIn: 'root',
})
export class CreateProgramFacade {
  programsService = inject(ProgramsService);
  snackbarService = inject(SnackbarService);
  router = inject(Router);

  private localStorageKey = 'create-program-draft';

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

  isProgramInvalid = computed<boolean>(
    () =>
      this.trainingProgramValidation().baseInfoInvalid ||
      this.trainingProgramValidation().dateRangeInvalid() ||
      this.trainingProgramValidation().scheduleInvalid(),
  );

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

  addWorkout(weekIndex: number, workoutModel: Workout) {
    this._trainingProgramModel.update((program) => {
      const weeks = program.weeks;

      weeks[weekIndex] = {
        ...weeks[weekIndex],
        workouts: [...weeks[weekIndex].workouts, workoutModel],
      };

      return {
        ...program,
        weeks,
      };
    });
  }

  editWorkout(weekIndex: number, editWorkoutIdx: number, data: Workout) {
    this._trainingProgramModel.update((p) => ({
      ...p,
      weeks: p.weeks.map((week, idx) =>
        idx === weekIndex
          ? {
              ...week,
              workouts: week.workouts.map((w, idx) => (idx === editWorkoutIdx ? data : w)),
            }
          : week,
      ),
    }));
  }

  removeWorkout(weekIndex: number, workoutIndex: number) {
    this._trainingProgramModel.update((p) => ({
      ...p,
      weeks: p.weeks.map((week, idx) =>
        idx === weekIndex
          ? {
              ...week,
              workouts: week.workouts.filter((_, idx) => idx !== workoutIndex),
            }
          : week,
      ),
    }));
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
  }

  loadProgramDraft() {
    const draft = localStorage.getItem(this.localStorageKey);

    if (!draft) return;

    const draftJson = JSON.parse(draft);

    this._trainingProgramModel.set(draftJson);
  }

  removeProgramDraft() {
    localStorage.removeItem(this.localStorageKey);
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
