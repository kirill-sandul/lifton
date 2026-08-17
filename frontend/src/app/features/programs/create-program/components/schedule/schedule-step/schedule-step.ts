import { Component, inject } from '@angular/core';
import { CreateProgramFacade } from '@features/programs/create-program/facade/create-program.facade';
import { WeekWorkoutsComponent } from '@features/programs/create-program/components/schedule/week-workouts/week-workouts';
import { DateRangePicker } from '@features/programs/create-program/components/schedule/date-range-picker/date-range-picker';

@Component({
  selector: 'app-schedule-step',
  imports: [WeekWorkoutsComponent, DateRangePicker],
  templateUrl: './schedule-step.html',
  styleUrl: './schedule-step.scss',
})
export class ScheduleStepComponent {
  createProgramFacade = inject(CreateProgramFacade);
}
