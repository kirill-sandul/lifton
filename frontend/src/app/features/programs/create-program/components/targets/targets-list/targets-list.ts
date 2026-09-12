import { Component, computed, inject, signal } from '@angular/core';
import { CreateProgramFacade } from '@features/programs/create-program/facade/create-program.facade';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { LucideDynamicIcon } from '@lucide/angular';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog';
import {
  ConfirmDialogData,
  TargetModalData,
} from '@features/programs/create-program/models/create-program.models';
import { ExerciseUnit, Target, TargetUi } from '@core/models/training.models';
import { TargetModalComponent } from '@features/programs/create-program/components/targets/target-modal/target-modal';
import { ExerciseUnitPipe } from '@core/pipes/exercise-unit/exercise-unit.pipe';

@Component({
  selector: 'app-targets-list',
  imports: [
    CdkOverlayOrigin,
    LucideDynamicIcon,
    ConfirmDialogComponent,
    CdkConnectedOverlay,
    TargetModalComponent,
    ExerciseUnitPipe,
  ],
  templateUrl: './targets-list.html',
  styleUrl: './targets-list.scss',
})
export class TargetsListComponent {
  createProgramFacade = inject(CreateProgramFacade);

  targetsList = computed<TargetUi[]>(() => {
    const targets = this.createProgramFacade.trainingProgramModel().targets;
    const savedExercisesMap = this.createProgramFacade.exercisesMap();

    return targets.map((t) => {
      const bindedExercise = Object.values(savedExercisesMap).find(
        (d) => d.tempId === t.exerciseTempId,
      );

      return {
        name: t.name,
        exercise: {
          id: t.exerciseTempId,
          name: bindedExercise?.name ?? '',
          unit: bindedExercise?.unit ?? ExerciseUnit.KG,
        },
        initialValue: t.initialValue,
        targetValue: t.targetValue,
      };
    });
  });

  editTargetModal = signal<TargetModalData>({
    show: false,
    defaultValues: null,
    editTargetIdx: -1,
  });

  confirmDialog = signal<ConfirmDialogData | null>(null);

  openEditTargetModal(index: number, defaults: TargetUi) {
    this.editTargetModal.set({
      show: true,
      defaultValues: {
        name: defaults.name,
        exerciseTempId: defaults.exercise.id,
        initialValue: defaults.initialValue,
        targetValue: defaults.targetValue,
      },
      editTargetIdx: index,
    });
  }

  closeEditTargetModal() {
    this.editTargetModal.set({
      show: false,
      defaultValues: null,
      editTargetIdx: -1,
    });
  }

  openRemoveDialog(origin: CdkOverlayOrigin, index: number) {
    this.confirmDialog.set({
      show: true,
      origin,
      elemIndex: index,
    });
  }

  closeRemoveDialog() {
    this.confirmDialog.set(null);
  }

  editTarget(target: Target) {
    this.createProgramFacade.editTarget(this.editTargetModal().editTargetIdx, target);
  }

  removeTarget() {
    if (!this.confirmDialog()) return;

    this.createProgramFacade.removeTarget(this.confirmDialog()!.elemIndex);
    this.closeRemoveDialog();
  }
}
