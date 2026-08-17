import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsListWidget } from './clients-list-widget';

describe('ClientsListWidget', () => {
  let component: ClientsListWidget;
  let fixture: ComponentFixture<ClientsListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsListWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
