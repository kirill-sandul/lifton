import { Component, inject, output } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button';
import { LucideDynamicIcon } from '@lucide/angular';
import { WorkoutSessionFacade } from '@features/workout-session/facade/workout-session.facade';

@Component({
  selector: 'workout-interaction-section',
  imports: [ButtonComponent, LucideDynamicIcon],
  templateUrl: './interaction-section.html',
  styleUrl: './interaction-section.scss',
})
export class InteractionSection {
  workoutSessionFacade = inject(WorkoutSessionFacade);

  nextExercise = output();
  prevExercise = output();

  onInputChange(setIndex: number, field: 'executedValue' | 'executedReps', value: string) {
    this.workoutSessionFacade.recordSet(
      this.workoutSessionFacade.currentExercise()?.id!,
      setIndex,
      field,
      parseInt(value),
    );
  }

  skipSet(setIndex: number) {
    this.workoutSessionFacade.skipSet(this.workoutSessionFacade.currentExercise()?.id!, setIndex);
  }

  skipExercise(exerciseId: string) {
    this.workoutSessionFacade.skipExercise(exerciseId);
  }

  onInputBlur(setIndex: number) {
    this.workoutSessionFacade.toggleSetBlur(
      this.workoutSessionFacade.currentExercise()?.id!,
      setIndex,
      true,
    );
  }

  onInputFocus(setIndex: number) {
    this.workoutSessionFacade.toggleSetBlur(
      this.workoutSessionFacade.currentExercise()?.id!,
      setIndex,
      false,
    );
  }
}
