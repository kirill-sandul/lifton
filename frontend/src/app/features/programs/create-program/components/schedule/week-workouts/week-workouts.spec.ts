import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDropdown } from './week-workouts';

describe('WeekDropdown', () => {
  let component: WeekDropdown;
  let fixture: ComponentFixture<WeekDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
