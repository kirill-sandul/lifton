import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { LucideDynamicIcon, LucideMoveRight } from '@lucide/angular';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { ClientFacade } from '@core/facades/roles/client/client.facade';
import { ButtonComponent } from '@shared/components/button/button';
import { SkipWorkoutModal } from '@features/dashboard/components/client/workout-widget/components/skip-workout-modal/skip-workout-modal';
import { ExerciseSet } from '@core/models/training.models';

@Component({
  selector: 'app-workout-widget',
  imports: [
    RouterLink,
    ButtonComponent,
    TitleCasePipe,
    LucideMoveRight,
    DatePipe,
    LucideDynamicIcon,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    SkipWorkoutModal,
  ],
  templateUrl: './workout-widget.html',
  styleUrl: './workout-widget.scss',
})
export class WorkoutWidgetComponent {
  clientFacade = inject(ClientFacade);

  confirmSkippingModal = signal(false);
  actionsDropdownShow = signal(false);
  actionsDropdownPositions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    },
  ];

  getTotalReps(exSets: ExerciseSet[]) {
    return exSets.reduce((acc, cur) => acc + cur.reps, 0);
  }

  getTotalVolume(exSets: ExerciseSet[]) {
    return exSets.reduce((acc, cur) => acc + cur.targetValue, 0);
  }

  skipWorkout(skipReason: string | null) {
    this.clientFacade.skipWorkout(skipReason);
    this.confirmSkippingModal.set(false);
  }
}
