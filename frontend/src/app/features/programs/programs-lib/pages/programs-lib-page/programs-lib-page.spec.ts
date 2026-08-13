import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsLibPage } from './programs-lib-page';

describe('ProgramsLibPage', () => {
  let component: ProgramsLibPage;
  let fixture: ComponentFixture<ProgramsLibPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramsLibPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramsLibPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
