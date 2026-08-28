import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesSlider } from './exercises-slider';

describe('ExercisesSlider', () => {
  let component: ExercisesSlider;
  let fixture: ComponentFixture<ExercisesSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisesSlider],
    }).compileComponents();

    fixture = TestBed.createComponent(ExercisesSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
