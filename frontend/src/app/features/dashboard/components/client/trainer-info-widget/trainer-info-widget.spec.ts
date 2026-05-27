import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerInfoWidget } from './trainer-info-widget';

describe('TrainerInfoWidget', () => {
  let component: TrainerInfoWidget;
  let fixture: ComponentFixture<TrainerInfoWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerInfoWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerInfoWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
