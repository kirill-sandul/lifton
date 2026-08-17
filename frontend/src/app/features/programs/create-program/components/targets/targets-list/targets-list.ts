import { Component, computed, inject, output, signal } from '@angular/core';
import { CreateProgramFacade } from '@features/programs/create-program/facade/create-program.facade';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { LucideDynamicIcon } from '@lucide/angular';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog';
import {
  ConfirmDialogData,
  TargetModalData,
} from '@features/programs/create-program/models/create-program.models';
import { Target } from '@core/models/training.models';
import { TargetModalComponent } from '@features/programs/create-program/components/targets/target-modal/target-modal';

@Component({
  selector: 'app-targets-list',
  imports: [
    CdkOverlayOrigin,
    LucideDynamicIcon,
    ConfirmDialogComponent,
    CdkConnectedOverlay,
    TargetModalComponent,
  ],
  templateUrl: './targets-list.html',
  styleUrl: './targets-list.scss',
})
export class TargetsListComponent {
  createProgramFacade = inject(CreateProgramFacade);

  targetsList = computed(() => this.createProgramFacade.trainingProgramModel().targets);

  editTargetModal = signal<TargetModalData>({
    show: false,
    defaultValues: null,
    editTargetIdx: -1,
  });

  confirmDialog = signal<ConfirmDialogData | null>(null);

  openEditTargetModal(index: number, defaults: Target) {
    this.editTargetModal.set({
      show: true,
      defaultValues: defaults,
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
