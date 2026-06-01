import { Type } from '@angular/core';
import { UserRole } from '@core/models/user.models';

import {
  WorkoutWidgetComponent,
  TrainerInfoWidgetComponent,
  CompletionWidgetComponent,
  StreakWidgetComponent,
  TargetsWidgetComponent,
  ClientScheduleWidgetComponent,
  ProgressChartComponent,
} from '@features/dashboard/components/client';

import {
  AvgProgressWidgetComponent,
  AdherenceRateWidgetComponent,
  CompletedWorkoutsWidgetComponent,
  ActiveProgramsWidgetComponent,
  TrainerScheduleWidgetComponent,
  TodoWidgetComponent,
  ClientsListWidgetComponent,
  ClientsProgressChartComponent,
} from '@features/dashboard/components/trainer';

type WidgetList = {
  component: Type<any>;
  grid: string;
};

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
      component: ClientScheduleWidgetComponent,
      grid: 'grid-rows-3-4 grid-cols-3-4',
    },
    {
      component: ProgressChartComponent,
      grid: 'grid-rows-1-3 grid-cols-2-3',
    },
  ],
  TRAINER: [
    {
      component: AvgProgressWidgetComponent,
      grid: 'grid-rows-1-2',
    },
    {
      component: AdherenceRateWidgetComponent,
      grid: 'grid-rows-1-2',
    },
    {
      component: CompletedWorkoutsWidgetComponent,
      grid: 'grid-rows-1-2 min-size',
    },
    {
      component: ActiveProgramsWidgetComponent,
      grid: 'grid-rows-1-2 ',
    },
    {
      component: TrainerScheduleWidgetComponent,
      grid: 'grid-rows-1-2 grid-span-3 max-size',
    },
    {
      component: ClientsListWidgetComponent,
      grid: 'grid-rows-2-3',
    },
    {
      component: ClientsProgressChartComponent,
      grid: 'grid-rows-2-3 grid-span-3',
    },
    {
      component: TodoWidgetComponent,
      grid: 'grid-rows-2-3 grid-cols-5-8',
    },
  ],
};

export const NO_DATA_WIDGET_REGISTRY: DashboardWidgetRegistry = {
  CLIENT: [
    {
      component: TrainerInfoWidgetComponent,
      grid: 'grid-rows-1-3 grid-cols-1-2',
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
      component: ClientScheduleWidgetComponent,
      grid: 'grid-rows-2-3 grid-cols-1-2',
    },
    {
      component: ProgressChartComponent,
      grid: 'grid-rows-1-2 grid-cols-2-3',
    },
  ],
  TRAINER: [],
};
