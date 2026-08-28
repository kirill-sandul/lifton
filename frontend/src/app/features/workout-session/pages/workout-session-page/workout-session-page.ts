import { Component, HostListener, inject } from '@angular/core';
import { TimeSection } from '@features/workout-session/components/time-section/time-section';
import { ExercisesSlider } from '@features/workout-session/components/exercises-slider/exercises-slider';
import { InteractionSection } from '@features/workout-session/components/interaction-section/interaction-section';
import { WorkoutSessionFacade } from '@features/workout-session/facade/workout-session.facade';
import { FinishWorkoutModal } from '@features/workout-session/components/finish-workout-modal/finish-workout-modal';

@Component({
  selector: 'app-workout-session-page',
  imports: [TimeSection, ExercisesSlider, InteractionSection, FinishWorkoutModal],
  templateUrl: './workout-session-page.html',
  styleUrl: './workout-session-page.scss',
})
export class WorkoutSessionPageComponent {
  workoutSessionFacade = inject(WorkoutSessionFacade);

  @HostListener('window:beforeunload')
  saveRecord() {
    this.workoutSessionFacade.saveToLocalStorage();
  }

  ngOnDestroy(): void {
    this.workoutSessionFacade.saveToLocalStorage();
  }
}
