import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStepGoal } from './quiz-step-goal';

describe('QuizStepGoal', () => {
  let component: QuizStepGoal;
  let fixture: ComponentFixture<QuizStepGoal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizStepGoal],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizStepGoal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
