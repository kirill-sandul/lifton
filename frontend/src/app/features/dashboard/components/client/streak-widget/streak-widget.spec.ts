import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreakWidget } from './streak-widget';

describe('StreakWidget', () => {
  let component: StreakWidget;
  let fixture: ComponentFixture<StreakWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreakWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(StreakWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
