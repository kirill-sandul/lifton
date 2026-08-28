import {
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { WorkoutSessionFacade } from '@features/workout-session/facade/workout-session.facade';

@Component({
  selector: 'workout-exercises-slider',
  imports: [LucideDynamicIcon],
  templateUrl: './exercises-slider.html',
  styleUrl: './exercises-slider.scss',
})
export class ExercisesSlider {
  workoutSessionFacade = inject(WorkoutSessionFacade);

  sliderRef = viewChild<ElementRef<HTMLDivElement>>('slider');
  sliderContainerRef = viewChild<ElementRef<HTMLDivElement>>('sliderContainer');
  slidesRef = viewChildren<ElementRef<HTMLDivElement>>('slide');

  sliderStep = signal<number>(0);

  constructor() {
    effect(() => {
      const slides = this.slidesRef();
      const workoutSession = this.workoutSessionFacade.workoutSession();

      if (workoutSession && slides.length > 0) this.centerSlide();
    });

    effect(() => {
      const sliderStep = this.sliderStep();
      const slides = this.slidesRef();

      if (sliderStep === 0) this.workoutSessionFacade.disabledSliderPrevButton.set(true);
      else this.workoutSessionFacade.disabledSliderPrevButton.set(false);

      if (sliderStep === slides.length - 1)
        this.workoutSessionFacade.disabledSliderNextButton.set(true);
      else this.workoutSessionFacade.disabledSliderNextButton.set(false);
    });
  }

  setExercise() {
    this.workoutSessionFacade.setExercise(this.sliderStep());
  }

  prevExercise() {
    if (this.sliderStep() === 0) return;

    this.sliderStep.update((v) => v - 1);
    this.centerSlide();
    this.setExercise();
  }

  nextExercise() {
    const totalSlides = this.slidesRef().length;
    if (this.sliderStep() === totalSlides - 1) return;

    this.sliderStep.update((v) => v + 1);

    this.centerSlide();
    this.setExercise();
  }

  private centerSlide() {
    const sliderElem = this.sliderRef()?.nativeElement;
    const sliderContainerElem = this.sliderContainerRef()?.nativeElement;
    const slides = this.slidesRef();

    if (!sliderElem || !sliderContainerElem) return;

    const targetSlide = slides[this.sliderStep()].nativeElement;

    const sliderWidth = sliderElem.offsetWidth;

    const slideLeft = targetSlide.offsetLeft;
    const slideWidth = targetSlide.offsetWidth;

    const targetCenterPos = -(slideLeft - (sliderWidth / 2 - slideWidth / 2));

    sliderContainerElem.style.transform = `translateX(${targetCenterPos}px)`;

    slides.forEach((slide, idx) => {
      if (idx === this.sliderStep()) {
        slides[idx].nativeElement.classList.add('active');
      } else {
        slides[idx].nativeElement.classList.remove('active');
      }
    });
  }
}
