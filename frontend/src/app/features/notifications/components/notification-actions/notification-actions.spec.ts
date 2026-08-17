import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationActions } from './notification-actions';

describe('NotificationActions', () => {
  let component: NotificationActions;
  let fixture: ComponentFixture<NotificationActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationActions],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
