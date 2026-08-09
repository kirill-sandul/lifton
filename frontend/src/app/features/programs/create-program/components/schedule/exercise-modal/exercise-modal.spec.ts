import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseModal } from './exercise-modal';

describe('ExerciseModal', () => {
  let component: ExerciseModal;
  let fixture: ComponentFixture<ExerciseModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
