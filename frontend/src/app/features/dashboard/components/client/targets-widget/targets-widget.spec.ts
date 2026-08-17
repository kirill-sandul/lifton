import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetsWidget } from './targets-widget';

describe('TargetsWidget', () => {
  let component: TargetsWidget;
  let fixture: ComponentFixture<TargetsWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetsWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetsWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
