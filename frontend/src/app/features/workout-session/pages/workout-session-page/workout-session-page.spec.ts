import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutSessionPage } from './workout-session-page';

describe('WorkoutSessionPage', () => {
  let component: WorkoutSessionPage;
  let fixture: ComponentFixture<WorkoutSessionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutSessionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutSessionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
