import { Component } from '@angular/core';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { LucideCircleX, LucidePlus } from '@lucide/angular';
import { FormControl, Validators } from '@angular/forms';
import { Checkbox } from '@shared/components/checkbox/checkbox';

export interface TodoWidgetTask {
  id: string;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-widget',
  imports: [BaseInputComponent, LucidePlus, LucideCircleX, Checkbox],
  templateUrl: './todo-widget.html',
  styleUrl: './todo-widget.scss',
})
export class TodoWidgetComponent {
  taskControl = new FormControl('', [Validators.minLength(3), Validators.maxLength(70)]);
  tasks: TodoWidgetTask[] = [];

  addTask() {
    if (!this.taskControl.value || this.taskControl.invalid) return;

    this.tasks.push({
      id: crypto.randomUUID(),
      content: this.taskControl.value,
      completed: false,
    });

    this.taskControl.reset();
  }

  onComplete(taskId: string, checkBoxState: boolean) {
    const taskIdx = this.tasks.findIndex((task) => task.id === taskId);
    this.tasks[taskIdx].completed = checkBoxState;
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
