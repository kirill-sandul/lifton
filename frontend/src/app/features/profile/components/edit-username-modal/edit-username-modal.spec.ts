import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsernameModal } from './edit-username-modal';

describe('EditUsernameModal', () => {
  let component: EditUsernameModal;
  let fixture: ComponentFixture<EditUsernameModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUsernameModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUsernameModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
