import { TestBed } from '@angular/core/testing';

import { WorkoutSession } from './workout-session';

describe('WorkoutSession', () => {
  let service: WorkoutSession;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutSession);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
