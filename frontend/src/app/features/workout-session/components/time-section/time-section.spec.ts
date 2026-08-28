import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSection } from './time-section';

describe('TimeSection', () => {
  let component: TimeSection;
  let fixture: ComponentFixture<TimeSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSection],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
