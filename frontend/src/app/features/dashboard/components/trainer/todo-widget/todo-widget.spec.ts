import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoWidget } from './todo-widget';

describe('TodoWidget', () => {
  let component: TodoWidget;
  let fixture: ComponentFixture<TodoWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
