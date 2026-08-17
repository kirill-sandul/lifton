import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleStep } from './schedule-step';

describe('ScheduleStep', () => {
  let component: ScheduleStep;
  let fixture: ComponentFixture<ScheduleStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleStep],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
