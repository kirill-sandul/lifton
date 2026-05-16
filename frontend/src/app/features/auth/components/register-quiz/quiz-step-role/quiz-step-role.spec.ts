import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStepRole } from './quiz-step-role';

describe('QuizStepRole', () => {
  let component: QuizStepRole;
  let fixture: ComponentFixture<QuizStepRole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizStepRole],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizStepRole);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
