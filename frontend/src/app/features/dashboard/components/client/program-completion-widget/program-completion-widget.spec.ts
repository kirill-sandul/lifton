import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramCompletionWidget } from './program-completion-widget';

describe('ProgramCompletionWidget', () => {
  let component: ProgramCompletionWidget;
  let fixture: ComponentFixture<ProgramCompletionWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramCompletionWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramCompletionWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
