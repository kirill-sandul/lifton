import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button';
import {
  BehaviorSubject,
  map,
  NEVER,
  Observable,
  scan,
  shareReplay,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { WorkoutSessionFacade } from '@features/workout-session/facade/workout-session.facade';
import { WeekDayPipe } from '@core/pipes/week-day/week-day-pipe';

type TimerCommand = 'START' | 'PAUSE';

@Component({
  selector: 'workout-time-section',
  imports: [ButtonComponent, AsyncPipe, LucideDynamicIcon, WeekDayPipe],
  templateUrl: './time-section.html',
  styleUrl: './time-section.scss',
})
export class TimeSection {
  workoutSessionFacade = inject(WorkoutSessionFacade);

  private command$ = new BehaviorSubject<TimerCommand>('START');

  timeDisplay$ = new Observable<string>();

  private totalSeconds$ = new Observable<number>();

  constructor() {
    const savedSeconds = this.workoutSessionFacade.durationSec();

    this.totalSeconds$ = this.command$.pipe(
      tap(() => '00:00:00'),
      switchMap((command) => {
        if (command === 'START') {
          return timer(0, 1000).pipe(map(() => 1));
        }

        return NEVER;
      }),
      scan((accSeconds, currentTick) => accSeconds + currentTick, savedSeconds),
      shareReplay(1),
    );

    this.totalSeconds$.subscribe((seconds) => {
      this.workoutSessionFacade.durationSec.set(seconds);
    });

    this.timeDisplay$ = this.totalSeconds$.pipe(
      map((totalSeconds) => this.formatTime(totalSeconds)),
    );
  }

  start() {
    this.command$.next('START');
  }

  pause() {
    this.command$.next('PAUSE');
  }

  get isRunning(): boolean {
    return this.command$.value === 'START';
  }

  private formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');

    return `${h}:${m}:${s}`;
  }
}
