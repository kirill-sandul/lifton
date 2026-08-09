import { Component, inject, signal } from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { LucideDynamicIcon } from '@lucide/angular';
import { TargetModalData } from '@features/programs/create-program/models/create-program.models';
import { TargetModalComponent } from '@features/programs/create-program/components/targets/target-modal/target-modal';
import { Target } from '@core/models/training.models';
import { CreateProgramFacade } from '@features/programs/create-program/facade/create-program.facade';

@Component({
  selector: 'app-add-target',
  imports: [CdkOverlayOrigin, LucideDynamicIcon, CdkConnectedOverlay, TargetModalComponent],
  templateUrl: './add-target.html',
  styleUrl: './add-target.scss',
})
export class AddTargetComponent {
  createProgramFacade = inject(CreateProgramFacade);

  targetModalState = signal<TargetModalData>({
    show: false,
    defaultValues: null,
    editTargetIdx: -1,
  });

  openTargetModal() {
    this.targetModalState.set({
      show: true,
      defaultValues: null,
      editTargetIdx: -1,
    });
  }

  addTarget(targetModel: Target) {
    this.createProgramFacade.addTarget(targetModel);
  }

  closeTargetModal() {
    this.targetModalState.set({
      show: false,
      defaultValues: null,
      editTargetIdx: -1,
    });
  }
}
