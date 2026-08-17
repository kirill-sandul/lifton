import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetsList } from './targets-list';

describe('TargetsList', () => {
  let component: TargetsList;
  let fixture: ComponentFixture<TargetsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetsList],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
