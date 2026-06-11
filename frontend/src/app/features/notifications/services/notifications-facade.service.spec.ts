import { TestBed } from '@angular/core/testing';

import { NotificationsFacadeService } from './notifications-facade.service';

describe('NotificationsFacadeService', () => {
  let service: NotificationsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
