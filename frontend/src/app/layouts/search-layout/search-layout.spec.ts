import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLayout } from './search-layout';

describe('SearchLayout', () => {
  let component: SearchLayout;
  let fixture: ComponentFixture<SearchLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
