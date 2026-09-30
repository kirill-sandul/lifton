import { computed, inject, Injectable, signal } from '@angular/core';
import { TrainerService } from '@core/services/roles/trainer/trainer.service';
import {
  AdherenceWidgetRes,
  TrainerDashboardRes,
  TrainerScheduleWidgetRes,
  TrainerTodoListItem,
  TrainerTodoListWidgetRes,
} from '@core/api-contract/dashboard.api';
import { BehaviorSubject, map, merge, Subject, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TrainerFacade {
  private trainerService = inject(TrainerService);

  clients = computed(() => this.trainerService.clients());

  dashboardData = computed<TrainerDashboardRes | null>(() => {
    if (this.trainerService.dashboardData()) return this.trainerService.dashboardData();
    else return null;
  });

  adherenceRateWidget = computed<AdherenceWidgetRes | null>(() => {
    const dashboardData = this.dashboardData();
    return dashboardData ? dashboardData.adherenceRateWidget : null;
  });

  workoutsLastWeek = computed<number | null>(() => {
    const dashboardData = this.dashboardData();
    return dashboardData ? dashboardData.completedWorkoutsWidget : null;
  });

  activePrograms = computed<number | null>(() => {
    const dashboardData = this.dashboardData();
    return dashboardData ? dashboardData.activeProgramsWidget : null;
  });

  scheduleWidget = computed<TrainerScheduleWidgetRes | null>(() => {
    const dashboardData = this.dashboardData();
    return dashboardData ? dashboardData.scheduleWidget : null;
  });

  todoListWidget = computed(() => {
    const dashboardData = this.dashboardData();
    return dashboardData ? dashboardData.todoWidget : null;
  });

  allClientsProgressWidget = computed(() => {
    const dashboardData = this.dashboardData();
    return dashboardData ? dashboardData.allClientsProgressWidget : null;
  });

  private localTasks$ = new BehaviorSubject<TrainerTodoListItem[]>([]);

  private serverTasks$ = toObservable(this.todoListWidget).pipe(
    map((tasks) => (tasks ? tasks.items : [])),
  );

  readonly tasks = toSignal(
    this.serverTasks$.pipe(
      switchMap((serverRes) => {
        this.localTasks$.next(serverRes);

        return this.localTasks$;
      }),
    ),
    { initialValue: [] },
  );

  addTask(taskContent: string) {
    const taskId = crypto.randomUUID();

    const currentTasks = this.localTasks$.getValue();
    const newTask = {
      id: taskId,
      content: taskContent,
      completed: false,
    };

    this.localTasks$.next([...currentTasks, newTask]);

    return this.trainerService.addTask(taskId, taskContent).subscribe({
      error: () => {
        // rollback on error
        this.localTasks$.next(this.localTasks$.getValue().filter((t) => t.id !== taskId));
      },
    });
  }

  editTask({ taskId, completed }: { taskId: string; completed: boolean }) {
    const updatedTasks = this.localTasks$.getValue().map((task) => {
      if (task.id === taskId)
        return {
          ...task,
          completed,
        };

      return task;
    });

    this.localTasks$.next(updatedTasks);

    return this.trainerService.editTask({ taskId, completed }).subscribe();
  }

  removeTask(taskId: string) {
    const updatedTasks = this.localTasks$.getValue().filter((t) => t.id !== taskId);
    this.localTasks$.next(updatedTasks);

    return this.trainerService.removeTask(taskId).subscribe();
  }
}
