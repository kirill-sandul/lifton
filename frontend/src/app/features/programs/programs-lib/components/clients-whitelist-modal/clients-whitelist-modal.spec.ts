import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsWhitelistModal } from './clients-whitelist-modal';

describe('ClientsWhitelistModal', () => {
  let component: ClientsWhitelistModal;
  let fixture: ComponentFixture<ClientsWhitelistModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsWhitelistModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsWhitelistModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
