import { TestBed } from '@angular/core/testing';

import { ProgramsLibFacade } from './programs-lib.facade';

describe('ProgramsLibFacade', () => {
  let service: ProgramsLibFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramsLibFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
