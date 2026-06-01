import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSelectorComponent } from './client-selector';

describe('ClientSelector', () => {
  let component: ClientSelectorComponent;
  let fixture: ComponentFixture<ClientSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSelectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
