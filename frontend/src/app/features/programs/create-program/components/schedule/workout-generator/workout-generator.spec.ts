import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutGenerator } from './workout-generator';

describe('WorkoutGenerator', () => {
  let component: WorkoutGenerator;
  let fixture: ComponentFixture<WorkoutGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutGenerator],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
