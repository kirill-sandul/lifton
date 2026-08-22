import { Component, inject, input, output, signal } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { LucideDynamicIcon } from '@lucide/angular';
import { WeekDayPipe } from '@core/pipes/week-day/week-day-pipe';
import { Exercise, Workout } from '@core/models/training.models';
import { ConfirmDialogData } from '@features/programs/create-program/models/create-program.models';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog';
import { CreateProgramFacade } from '@features/programs/create-program/facade/create-program.facade';

@Component({
  selector: 'app-workouts-list',
  imports: [CdkOverlayOrigin, LucideDynamicIcon, WeekDayPipe, ConfirmDialogComponent],
  templateUrl: './workouts-list.html',
  styleUrl: './workouts-list.scss',
})
export class WorkoutsListComponent {
  createProgramFacade = inject(CreateProgramFacade);

  workoutsList = input.required<Workout[]>();
  weekIndex = input.required<number>();

  confirmDialog = signal<ConfirmDialogData | null>(null);

  editWorkout = output<{ index: number; workout: Workout }>();
  onRemoveWorkout = output<{ index: number }>();

  displayWorkoutExercises(exercises: Exercise[]) {
    return exercises.length > 1 ? `${exercises.length} exercises` : `${exercises.length} exercise`;
  }

  openRemoveDialog(origin: CdkOverlayOrigin, index: number) {
    this.confirmDialog.set({
      show: true,
      elemIndex: index,
      origin,
    });
  }

  closeRemoveDialog() {
    this.confirmDialog.set(null);
  }

  removeWorkout() {
    const confirmDialogState = this.confirmDialog();

    if (!confirmDialogState) return;

    this.onRemoveWorkout.emit({ index: confirmDialogState.elemIndex });

    this.createProgramFacade.removeWorkout(this.weekIndex(), confirmDialogState.elemIndex);
    this.closeRemoveDialog();
  }
}
