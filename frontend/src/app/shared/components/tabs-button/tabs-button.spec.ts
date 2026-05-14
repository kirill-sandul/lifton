import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsButton } from './tabs-button';

describe('TabsButton', () => {
  let component: TabsButton;
  let fixture: ComponentFixture<TabsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsButton],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
