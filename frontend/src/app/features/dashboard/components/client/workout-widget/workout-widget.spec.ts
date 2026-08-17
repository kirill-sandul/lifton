import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutWidget } from './workout-widget';

describe('WorkoutWidget', () => {
  let component: WorkoutWidget;
  let fixture: ComponentFixture<WorkoutWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
