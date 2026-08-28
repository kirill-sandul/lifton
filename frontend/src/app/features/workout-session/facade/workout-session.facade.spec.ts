import { TestBed } from '@angular/core/testing';

import { WorkoutSessionFacade } from './workout-session.facade';

describe('WorkoutSessionFacade', () => {
  let service: WorkoutSessionFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutSessionFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
