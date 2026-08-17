import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPfpModal } from './edit-pfp-modal';

describe('EditPfpModal', () => {
  let component: EditPfpModal;
  let fixture: ComponentFixture<EditPfpModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPfpModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPfpModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
