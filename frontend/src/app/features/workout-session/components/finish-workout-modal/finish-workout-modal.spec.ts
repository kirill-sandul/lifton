import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishWorkoutModal } from './finish-workout-modal';

describe('FinishWorkoutModal', () => {
  let component: FinishWorkoutModal;
  let fixture: ComponentFixture<FinishWorkoutModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishWorkoutModal],
    }).compileComponents();

    fixture = TestBed.createComponent(FinishWorkoutModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
