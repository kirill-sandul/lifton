import { Type } from "@angular/core";
import { UserRole } from "@core/models/user.models";
import { TrainerInfoWidgetComponent } from "@features/dashboard/components/client/trainer-info-widget/trainer-info-widget";
import { WorkoutWidgetComponent } from "@features/dashboard/components/client/workout-widget/workout-widget";
import { CompletionWidgetComponent, } from '@features/dashboard/components/client/program-completion-widget/program-completion-widget';
import { StreakWidgetComponent } from '@features/dashboard/components/client/streak-widget/streak-widget';
import { TargetsWidgetComponent } from '@features/dashboard/components/client/targets-widget/targets-widget';
import { ScheduleWidgetComponent } from '@features/dashboard/components/client/schedule-widget/schedule-widget';
import { ProgressChartComponent } from '@features/dashboard/components/client/progress-chart/progress-chart';

type WidgetList = {
  component: Type<any>,
  grid: string
}

export type DashboardWidgetRegistry = Record<UserRole, WidgetList[]>;

export const DASHBOARD_WIDGET_REGISTRY: DashboardWidgetRegistry = {
  CLIENT: [
    {
      component: WorkoutWidgetComponent,
      grid: 'grid-rows-1-3',
    },
    {
      component: TrainerInfoWidgetComponent,
      grid: 'grid-rows-3-4',
    },
    {
      component: CompletionWidgetComponent,
      grid: 'grid-rows-1-2 grid-cols-3-4',
    },
    {
      component: StreakWidgetComponent,
      grid: 'grid-rows-2-3 grid-cols-3-4',
    },
    {
      component: TargetsWidgetComponent,
      grid: 'grid-rows-3-4 grid-cols-2-3',
    },
    {
      component: ScheduleWidgetComponent,
      grid: 'grid-rows-3-4 grid-cols-3-4'
    },
    {
      component: ProgressChartComponent,
      grid: 'grid-rows-1-3 grid-cols-2-3',
    }
  ],
  TRAINER: []
};

export const NO_PROGRAM_WIDGET_REGISTRY: DashboardWidgetRegistry = {
  CLIENT: [
    {
      component: TrainerInfoWidgetComponent,
      grid: 'grid-rows-1-3',
    },
    {
      component: WorkoutWidgetComponent,
      grid: 'grid-rows-1-2',
    },
    {
      component: TargetsWidgetComponent,
      grid: 'grid-rows-2-3 grid-cols-2-3',
    },
    {
      component: ScheduleWidgetComponent,
      grid: 'grid-rows-3-4 grid-cols-1-1',
    },
    {
      component: ProgressChartComponent,
      grid: 'grid-rows-1-2 grid-cols-2-3',
    },
  ],
  TRAINER: [],
};
