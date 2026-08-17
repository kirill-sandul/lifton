import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherenceRateWidget } from './adherence-rate-widget';

describe('AdherenceRateWidget', () => {
  let component: AdherenceRateWidget;
  let fixture: ComponentFixture<AdherenceRateWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdherenceRateWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(AdherenceRateWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
