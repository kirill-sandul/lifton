import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerScheduleWidget } from './trainer-schedule-widget';

describe('TrainerScheduleWidget', () => {
  let component: TrainerScheduleWidget;
  let fixture: ComponentFixture<TrainerScheduleWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerScheduleWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerScheduleWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
