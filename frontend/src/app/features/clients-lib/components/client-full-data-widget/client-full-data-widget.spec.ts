import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFullDataWidget } from './client-full-data-widget';

describe('ClientFullDataWidget', () => {
  let component: ClientFullDataWidget;
  let fixture: ComponentFixture<ClientFullDataWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientFullDataWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientFullDataWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
