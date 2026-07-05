import { Component, inject, input, signal } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { WorkoutGenerator } from '@features/programs/create-program/components/workout-generator/workout-generator';
import { CreateProgramFacade } from '@features/programs/create-program/facade/create-program.facade';
import { WorkoutsListComponent } from '@features/programs/create-program/components/workouts-list/workouts-list';

@Component({
  selector: 'app-week-dropdown',
  imports: [WorkoutGenerator, LucideDynamicIcon, WorkoutsListComponent],
  templateUrl: './week-dropdown.html',
  styleUrl: './week-dropdown.scss',
})
export class WeekDropdownComponent {
  createProgramFacade = inject(CreateProgramFacade);

  weekIndex = input.required<number>();
  weekExpanded = signal(false);

  getWorkouts() {
    return this.createProgramFacade.trainingProgramModel().weeks[this.weekIndex()].workouts;
  }

  expandWeek() {
    this.weekExpanded.set(!this.weekExpanded());
  }
}
