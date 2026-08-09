import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetsStep } from './targets-step';

describe('TargetsStep', () => {
  let component: TargetsStep;
  let fixture: ComponentFixture<TargetsStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetsStep],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetsStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
