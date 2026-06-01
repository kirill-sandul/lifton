import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedWorkoutsWidget } from './completed-workouts-widget';

describe('CompletedWorkoutsWidget', () => {
  let component: CompletedWorkoutsWidget;
  let fixture: ComponentFixture<CompletedWorkoutsWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedWorkoutsWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedWorkoutsWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
