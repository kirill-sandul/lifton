import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPreviewWidget } from './client-preview';

describe('ClientPreviewWidget', () => {
  let component: ClientPreviewWidget;
  let fixture: ComponentFixture<ClientPreviewWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPreviewWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientPreviewWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
