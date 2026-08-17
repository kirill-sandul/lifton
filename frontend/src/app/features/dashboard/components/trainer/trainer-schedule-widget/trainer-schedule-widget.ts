import { Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CalendarWidgetComponent } from '@features/dashboard/components/calendar-widget/calendar-widget';
import { DatePipe } from '@angular/common';
import { ClientWorkoutOnDay } from '@core/models/training.models';
import { TrainerService } from '@core/services/roles/trainer/trainer.service';
import { ClientPreviewComponent } from '@shared/components/client-preview/client-preview';
import EmblaCarousel from 'embla-carousel';
import { LucideMoveLeft, LucideMoveRight } from '@lucide/angular';

@Component({
  selector: 'app-trainer-client-schedule-widget',
  imports: [
    CalendarWidgetComponent,
    DatePipe,
    ClientPreviewComponent,
    LucideMoveLeft,
    LucideMoveRight,
  ],
  templateUrl: './trainer-schedule-widget.html',
  styleUrl: './trainer-schedule-widget.scss',
})
export class TrainerScheduleWidgetComponent {
  trainerService = inject(TrainerService);

  selectedDay = signal<Date>(new Date());
  dayWorkouts = signal<ClientWorkoutOnDay[] | null>(null);
  schedule = this.trainerService.clientsWorkoutsOnDay;

  @ViewChild('embla') emblaRef!: ElementRef<HTMLElement>;
  emblaSlider?: ReturnType<typeof EmblaCarousel>;

  disableScrollPrev = signal<boolean>(true);
  disableScrollNext = signal<boolean>(false);

  constructor() {
    effect(() => {
      const workouts = this.getDayWorkouts(this.selectedDay());

      this.dayWorkouts.set(workouts ?? null);
    });
  }

  ngAfterViewInit() {
    if (!this.emblaRef?.nativeElement) return;
    const draggable = this.dayWorkouts()?.length! > 1;

    this.emblaSlider = EmblaCarousel(this.emblaRef.nativeElement, {
      loop: false,
      align: 'start',
      dragFree: draggable,
      watchDrag: draggable,
    });

    this.emblaSlider.on('scroll', () => this.updateSliderNavButtons());
    this.emblaSlider.on('reInit', () => this.updateSliderNavButtons());
  }

  updateSliderNavButtons() {
    if (!this.emblaSlider) return;

    this.disableScrollPrev.set(!this.emblaSlider.canScrollPrev());
    this.disableScrollNext.set(!this.emblaSlider.canScrollNext());
  }

  sliderNext() {
    this.emblaSlider?.scrollNext();
    this.updateSliderNavButtons();
  }

  sliderPrev() {
    this.emblaSlider?.scrollPrev();
    this.updateSliderNavButtons();
  }

  getDayWorkouts(day: Date) {
    this.selectedDay.set(day);

    const dayIdx = day.getDay();

    const weekDays: Record<number, string> = {
      0: 'SUNDAY',
      1: 'MONDAY',
      2: 'TUESDAY',
      3: 'WEDNESDAY',
      4: 'THURSDAY',
      5: 'FRIDAY',
      6: 'SATURDAY',
    };

    if (!this.schedule) return;

    return this.schedule.filter((d) => d.plannedWorkout.day === weekDays[dayIdx]);
  }
}
