import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionSection } from './interaction-section';

describe('InteractionSection', () => {
  let component: InteractionSection;
  let fixture: ComponentFixture<InteractionSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractionSection],
    }).compileComponents();

    fixture = TestBed.createComponent(InteractionSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
