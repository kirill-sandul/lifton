import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStepProfile } from './quiz-step-profile';

describe('QuizStepProfile', () => {
  let component: QuizStepProfile;
  let fixture: ComponentFixture<QuizStepProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizStepProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizStepProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
