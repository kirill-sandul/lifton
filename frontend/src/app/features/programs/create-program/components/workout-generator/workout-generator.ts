import { Component, inject, input, signal } from '@angular/core';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { LucideDynamicIcon } from '@lucide/angular';
import { Exercise, ExerciseSet, WeekDay, Workout } from '@core/models/training.models';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ExerciseModal } from '@features/programs/create-program/components/exercise-modal/exercise-modal';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { CreateProgramFacade } from '@features/programs/create-program/facade/create-program.facade';
import {
  ConfirmDialogData,
  EditingWorkout,
  ExerciseModalData,
} from '@features/programs/create-program/models/create-program.models';
import { WeekDayPipe } from '@core/pipes/week-day/week-day-pipe';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-workout-generator',
  imports: [
    BaseInputComponent,
    ExerciseModal,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    FormsModule,
    WeekDayPipe,
    ConfirmDialogComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './workout-generator.html',
  styleUrl: './workout-generator.scss',
})
export class WorkoutGenerator {
  createProgramFacade = inject(CreateProgramFacade);

  weekIndex = input.required<number>();

  weekDays = [
    WeekDay.MONDAY,
    WeekDay.TUESDAY,
    WeekDay.WEDNESDAY,
    WeekDay.THURSDAY,
    WeekDay.FRIDAY,
    WeekDay.SATURDAY,
    WeekDay.SUNDAY,
  ];

  workoutNameControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30),
  ]);
  formTouched = signal(false);

  exerciseModalState = signal<ExerciseModalData>({
    show: false,
    defaultValues: null,
    editExerciseIdx: -1,
  });

  confirmDialog = signal<ConfirmDialogData | null>(null);

  workoutModel = signal<Workout>({
    name: '',
    exercises: [],
    day: WeekDay.MONDAY,
  });

  editingMode = signal<EditingWorkout | null>(null);

  constructor() {
    this.workoutNameControl.valueChanges.subscribe((value) => {
      this.setWorkoutName(value ?? '');
    });
  }

  editExercise(exercise: Exercise) {
    const editExerciseIdx = this.exerciseModalState().editExerciseIdx;

    this.workoutModel.update((w) => ({
      ...w,
      exercises: w.exercises.map((ex, idx) => (idx === editExerciseIdx ? exercise : ex)),
    }));
  }

  removeExercise(index: number) {
    this.workoutModel.update((w) => ({
      ...w,
      exercises: w.exercises.filter((_, idx) => idx !== index),
    }));

    this.closeRemoveExerciseDialog();
  }

  setWorkoutName(name: string) {
    this.workoutModel.update((w) => ({
      ...w,
      name,
    }));
  }

  addExercise(exercise: Exercise) {
    this.workoutModel.update((w) => ({
      ...w,
      exercises: [...w.exercises, exercise],
    }));
  }

  setSelectedDay(day: WeekDay) {
    this.workoutModel.update((w) => ({
      ...w,
      day,
    }));
  }

  openRemoveExerciseDialog(origin: CdkOverlayOrigin, index: number) {
    this.confirmDialog.set({
      show: true,
      elemIndex: index,
      origin,
    });
  }

  closeRemoveExerciseDialog() {
    this.confirmDialog.set(null);
  }

  openExerciseModal() {
    this.exerciseModalState.update((d) => ({ ...d, show: true, defaultValues: null }));
  }

  closeExerciseModal() {
    this.exerciseModalState.set({
      show: false,
      defaultValues: null,
      editExerciseIdx: -1,
    });
  }

  openExerciseEdit(exercise: Exercise, index: number) {
    this.exerciseModalState.set({
      show: true,
      defaultValues: exercise,
      editExerciseIdx: index,
    });
  }

  editWorkoutMode(workoutIndex: number, workoutData: Workout) {
    this.editingMode.set({ workoutIndex, workoutName: workoutData.name });
    this.workoutModel.set(workoutData);
  }

  closeEditingWorkout() {
    this.editingMode.set(null);
  }

  saveEditedWorkout(workoutModel: Workout) {
    const editingWorkout = this.editingMode();

    if (!editingWorkout) return;

    this.createProgramFacade.editWorkout(
      this.weekIndex(),
      editingWorkout.workoutIndex,
      workoutModel,
    );
    this.closeEditingWorkout();
  }

  displayExerciseSets(sets: ExerciseSet[]) {
    if (sets.length === 1) return '1 set';
    else return `${sets.length} sets`;
  }

  createWorkout() {
    this.formTouched.set(true);
    this.workoutNameControl.markAsTouched();

    const formInvalid =
      this.workoutNameControl.invalid || this.workoutModel().exercises.length === 0;

    if (formInvalid) return;
    else if (this.editingMode()) return this.saveEditedWorkout(this.workoutModel());

    this.createProgramFacade.addWorkout(this.weekIndex(), this.workoutModel());
  }
}
