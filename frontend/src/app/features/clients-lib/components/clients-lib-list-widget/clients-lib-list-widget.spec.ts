import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsLibListWidget } from './clients-lib-list-widget';

describe('ClientsLibListWidget', () => {
  let component: ClientsLibListWidget;
  let fixture: ComponentFixture<ClientsLibListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsLibListWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsLibListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
