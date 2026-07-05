import { TestBed } from '@angular/core/testing';

import { NotificationsFacade } from './notifications.facade';

describe('NotificationsFacade', () => {
  let service: NotificationsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
