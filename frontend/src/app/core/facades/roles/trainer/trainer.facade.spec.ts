import { TestBed } from '@angular/core/testing';

import { TrainerFacade } from './trainer.facade';

describe('TrainerFacade', () => {
  let service: TrainerFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
