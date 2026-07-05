import { Injectable, signal } from '@angular/core';
import { TrainingCycle, TrainingProgram, Workout } from '@core/models/training.models';

@Injectable({
  providedIn: 'root',
})
export class CreateProgramFacade {
  private readonly _trainingProgramModel = signal<TrainingProgram>({
    cycle: TrainingCycle.WEEK,
    weeks: [{ workouts: [] }],
  });
  readonly trainingProgramModel = this._trainingProgramModel.asReadonly();

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
}
