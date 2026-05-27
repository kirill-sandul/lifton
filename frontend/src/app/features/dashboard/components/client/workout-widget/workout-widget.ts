import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button';
import { LucideMoveRight } from "@lucide/angular";

@Component({
  selector: 'app-workout-widget',
  imports: [RouterLink, ButtonComponent, LucideMoveRight],
  templateUrl: './workout-widget.html',
  styleUrl: './workout-widget.scss',
})
export class WorkoutWidgetComponent {}
