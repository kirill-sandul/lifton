import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfpCircle } from './pfp-circle';

describe('PfpCircle', () => {
  let component: PfpCircle;
  let fixture: ComponentFixture<PfpCircle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfpCircle],
    }).compileComponents();

    fixture = TestBed.createComponent(PfpCircle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
