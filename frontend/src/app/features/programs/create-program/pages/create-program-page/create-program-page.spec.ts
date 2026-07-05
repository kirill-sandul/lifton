import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramPage } from './create-program-page';

describe('CreateProgramPage', () => {
  let component: CreateProgramPage;
  let fixture: ComponentFixture<CreateProgramPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProgramPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProgramPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
