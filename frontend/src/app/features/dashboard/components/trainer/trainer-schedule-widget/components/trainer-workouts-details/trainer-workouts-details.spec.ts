import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerWorkoutsDetails } from './trainer-workouts-details';

describe('TrainerWorkoutsDetails', () => {
  let component: TrainerWorkoutsDetails;
  let fixture: ComponentFixture<TrainerWorkoutsDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerWorkoutsDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerWorkoutsDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
