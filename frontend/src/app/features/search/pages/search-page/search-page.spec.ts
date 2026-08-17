import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClientsPage } from './search-page';

describe('SearchClientsPage', () => {
  let component: SearchClientsPage;
  let fixture: ComponentFixture<SearchClientsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchClientsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchClientsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
