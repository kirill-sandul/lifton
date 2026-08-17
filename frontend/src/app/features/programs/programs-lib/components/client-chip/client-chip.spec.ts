import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientChip } from './client-chip';

describe('ClientChip', () => {
  let component: ClientChip;
  let fixture: ComponentFixture<ClientChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientChip],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientChip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
