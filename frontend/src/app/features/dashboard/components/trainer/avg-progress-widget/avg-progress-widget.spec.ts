import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgProgressWidget } from './avg-progress-widget';

describe('AvgProgressWidget', () => {
  let component: AvgProgressWidget;
  let fixture: ComponentFixture<AvgProgressWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvgProgressWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(AvgProgressWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
