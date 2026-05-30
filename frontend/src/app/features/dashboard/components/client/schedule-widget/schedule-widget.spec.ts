import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleWidget } from './schedule-widget';

describe('ScheduleWidget', () => {
  let component: ScheduleWidget;
  let fixture: ComponentFixture<ScheduleWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
