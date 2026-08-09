import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTarget } from './add-target';

describe('AddTarget', () => {
  let component: AddTarget;
  let fixture: ComponentFixture<AddTarget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTarget],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTarget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
