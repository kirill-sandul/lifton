import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAutocomplete } from './input-autocomplete';

describe('InputAutocomplete', () => {
  let component: InputAutocomplete;
  let fixture: ComponentFixture<InputAutocomplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAutocomplete],
    }).compileComponents();

    fixture = TestBed.createComponent(InputAutocomplete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
