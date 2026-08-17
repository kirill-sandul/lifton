import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsProgressChartComponent } from './clients-progress-chart';

describe('ClientsProgressChart', () => {
  let component: ClientsProgressChartComponent;
  let fixture: ComponentFixture<ClientsProgressChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsProgressChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsProgressChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
