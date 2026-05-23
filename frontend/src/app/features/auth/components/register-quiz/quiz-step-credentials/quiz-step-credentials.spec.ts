import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStepCredentials } from './quiz-step-credentials';

describe('QuizStepCredentials', () => {
  let component: QuizStepCredentials;
  let fixture: ComponentFixture<QuizStepCredentials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizStepCredentials],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizStepCredentials);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
