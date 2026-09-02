import { Component, input, signal } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { WorkoutResponse } from '@core/api-contract/training.api';
import { ExerciseSet } from '@core/models/training.models';

@Component({
  selector: 'app-workout-details',
  imports: [LucideDynamicIcon],
  templateUrl: './workout-details.html',
  styleUrl: './workout-details.scss',
})
export class WorkoutDetails {
  workoutData = input<WorkoutResponse | null>();

  openedExerciseIndex = signal<number | null>(null);

  getTotalReps(sets: ExerciseSet[]) {
    return sets.reduce((acc, cur) => acc + cur.reps, 0);
  }

  getTotalVolume(sets: ExerciseSet[]) {
    return sets.reduce((acc, cur) => acc + cur.targetValue * cur.reps, 0);
  }

  toggleExerciseDetail(exerciseIdx: number) {
    if (exerciseIdx === this.openedExerciseIndex()) return this.openedExerciseIndex.set(null);

    this.openedExerciseIndex.set(exerciseIdx);
  }
}
