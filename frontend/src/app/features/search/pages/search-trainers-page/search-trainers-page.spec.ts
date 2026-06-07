import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrainersPage } from './search-trainers-page';

describe('SearchTrainersPage', () => {
  let component: SearchTrainersPage;
  let fixture: ComponentFixture<SearchTrainersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTrainersPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTrainersPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
