import { Component, inject, input } from '@angular/core';
import { WorkoutGenerator } from '@features/programs/create-program/components/schedule/workout-generator/workout-generator';
import { CreateProgramFacade } from '@features/programs/create-program/facade/create-program.facade';
import { WorkoutsListComponent } from '@features/programs/create-program/components/schedule/workouts-list/workouts-list';
import { WeekDropdownComponent } from '@shared/components/week-dropdown/week-dropdown';

@Component({
  selector: 'app-week-workouts',
  imports: [WorkoutGenerator, WorkoutsListComponent, WeekDropdownComponent],
  templateUrl: './week-workouts.html',
  styleUrl: './week-workouts.scss',
})
export class WeekWorkoutsComponent {
  createProgramFacade = inject(CreateProgramFacade);

  weekIndex = input.required<number>();

  getWorkouts() {
    return this.createProgramFacade.trainingProgramModel().weeks[this.weekIndex()].workouts;
  }
}
