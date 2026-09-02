import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScheduleModal } from './full-schedule-modal';

describe('FullScheduleModal', () => {
  let component: FullScheduleModal;
  let fixture: ComponentFixture<FullScheduleModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullScheduleModal],
    }).compileComponents();

    fixture = TestBed.createComponent(FullScheduleModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
