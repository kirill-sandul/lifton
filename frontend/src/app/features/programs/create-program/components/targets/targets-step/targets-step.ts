import { Component } from '@angular/core';
import { TargetsListComponent } from '@features/programs/create-program/components/targets/targets-list/targets-list';
import { AddTargetComponent } from '@features/programs/create-program/components/targets/add-target/add-target';

@Component({
  selector: 'app-targets-step',
  imports: [TargetsListComponent, AddTargetComponent],
  templateUrl: './targets-step.html',
  styleUrl: './targets-step.scss',
})
export class TargetsStepComponent {}
