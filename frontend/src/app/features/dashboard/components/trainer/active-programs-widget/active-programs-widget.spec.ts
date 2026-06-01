import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveProgramsWidget } from './active-programs-widget';

describe('ActiveProgramsWidget', () => {
  let component: ActiveProgramsWidget;
  let fixture: ComponentFixture<ActiveProgramsWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveProgramsWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveProgramsWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
