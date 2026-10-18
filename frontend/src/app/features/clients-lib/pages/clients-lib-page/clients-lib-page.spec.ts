import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsLibPage } from './clients-lib-page';

describe('ClientsLibPage', () => {
  let component: ClientsLibPage;
  let fixture: ComponentFixture<ClientsLibPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsLibPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsLibPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
