import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipWorkoutModal } from './skip-workout-modal';

describe('SkipWorkoutModal', () => {
  let component: SkipWorkoutModal;
  let fixture: ComponentFixture<SkipWorkoutModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkipWorkoutModal],
    }).compileComponents();

    fixture = TestBed.createComponent(SkipWorkoutModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
