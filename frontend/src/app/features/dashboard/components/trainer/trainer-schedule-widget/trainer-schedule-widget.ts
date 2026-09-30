import { Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LucideMoveLeft, LucideMoveRight } from '@lucide/angular';
import { isSameDay } from 'date-fns';
import EmblaCarousel from 'embla-carousel';
import { CalendarWidgetComponent } from '@features/dashboard/components/calendar-widget/calendar-widget';
import { TrainerFacade } from '@core/facades/roles/trainer/trainer.facade';
import { ClientPreviewComponent } from '@shared/components/client-preview/client-preview';
import { ClientWorkoutOnDay } from '@core/api-contract/dashboard.api';
import { UserRole } from '@core/models/user.models';
import { FullTrainerScheduleModal } from '@features/dashboard/components/trainer/trainer-schedule-widget/components/full-trainer-schedule-modal/full-trainer-schedule-modal';

@Component({
  selector: 'app-trainer-client-schedule-widget',
  imports: [
    CalendarWidgetComponent,
    DatePipe,
    ClientPreviewComponent,
    LucideMoveLeft,
    LucideMoveRight,
    FullTrainerScheduleModal,
  ],
  templateUrl: './trainer-schedule-widget.html',
  styleUrl: './trainer-schedule-widget.scss',
})
export class TrainerScheduleWidgetComponent {
  trainerFacade = inject(TrainerFacade);

  schedule = this.trainerFacade.scheduleWidget();

  selectedDay = signal<Date>(new Date());
  dayWorkouts = signal<ClientWorkoutOnDay[] | null>(null);

  @ViewChild('embla') emblaRef!: ElementRef<HTMLElement>;
  emblaSlider?: ReturnType<typeof EmblaCarousel>;

  disableScrollPrev = signal<boolean>(true);
  disableScrollNext = signal<boolean>(false);

  showFullSchedule = signal<boolean>(false);

  protected readonly UserRole = UserRole;

  constructor() {
    effect(() => {
      this.schedule = this.trainerFacade.scheduleWidget();

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

  getDayWorkouts(day: Date): ClientWorkoutOnDay[] {
    this.selectedDay.set(day);

    if (!this.schedule) return [];

    let dayWorkouts: ClientWorkoutOnDay[] = [];

    Object.entries(this.schedule).forEach(([scheduleDate, workouts]) => {
      if (isSameDay(new Date(scheduleDate), day)) dayWorkouts = workouts;
    });

    return dayWorkouts;
  }
}
