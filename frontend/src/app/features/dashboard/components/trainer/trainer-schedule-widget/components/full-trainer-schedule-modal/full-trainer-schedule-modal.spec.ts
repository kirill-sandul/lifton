import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTrainerScheduleModal } from './full-trainer-schedule-modal';

describe('FullTrainerScheduleModal', () => {
  let component: FullTrainerScheduleModal;
  let fixture: ComponentFixture<FullTrainerScheduleModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullTrainerScheduleModal],
    }).compileComponents();

    fixture = TestBed.createComponent(FullTrainerScheduleModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
