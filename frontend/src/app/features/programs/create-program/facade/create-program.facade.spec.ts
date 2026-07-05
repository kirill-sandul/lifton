import { TestBed } from '@angular/core/testing';

import { CreateProgramFacade } from './create-program.facade';

describe('CreateProgramFacade', () => {
  let service: CreateProgramFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateProgramFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
