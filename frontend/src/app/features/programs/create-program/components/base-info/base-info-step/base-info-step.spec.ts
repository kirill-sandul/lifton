import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseInfoStep } from './base-info-step';

describe('BaseInfoStep', () => {
  let component: BaseInfoStep;
  let fixture: ComponentFixture<BaseInfoStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseInfoStep],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseInfoStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
