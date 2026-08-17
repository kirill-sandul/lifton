import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekSchedule } from './week-schedule';

describe('WeekSchedule', () => {
  let component: WeekSchedule;
  let fixture: ComponentFixture<WeekSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekSchedule],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekSchedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
