import { Component, computed, effect, inject, signal } from '@angular/core';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { LucideCircleX, LucidePlus } from '@lucide/angular';
import { FormControl, Validators } from '@angular/forms';
import { Checkbox } from '@shared/components/checkbox/checkbox';
import { TrainerFacade } from '@core/facades/roles/trainer/trainer.facade';
import { TrainerTodoListItem } from '@core/api-contract/dashboard.api';

@Component({
  selector: 'app-todo-widget',
  imports: [BaseInputComponent, LucidePlus, LucideCircleX, Checkbox],
  templateUrl: './todo-widget.html',
  styleUrl: './todo-widget.scss',
})
export class TodoWidgetComponent {
  trainerFacade = inject(TrainerFacade);

  taskControl = new FormControl('', [Validators.minLength(3), Validators.maxLength(70)]);

  tasks = computed(() => this.trainerFacade.tasks());

  addTask() {
    const taskControlValue = this.taskControl.value;
    if (!taskControlValue || this.taskControl.invalid) return;

    this.trainerFacade.addTask(taskControlValue);

    this.taskControl.reset();
  }

  onComplete(taskId: string, checkBoxState: boolean) {
    this.trainerFacade.editTask({
      taskId,
      completed: checkBoxState,
    });
  }

  removeTask(taskId: string) {
    this.trainerFacade.removeTask(taskId);
  }
}
