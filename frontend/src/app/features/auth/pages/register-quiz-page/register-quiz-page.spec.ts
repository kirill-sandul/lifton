import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterQuizPage } from './register-quiz-page';

describe('RegisterQuizPage', () => {
  let component: RegisterQuizPage;
  let fixture: ComponentFixture<RegisterQuizPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterQuizPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterQuizPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
