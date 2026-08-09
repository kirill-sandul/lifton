import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetModal } from './target-modal';

describe('TargetModal', () => {
  let component: TargetModal;
  let fixture: ComponentFixture<TargetModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetModal],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
