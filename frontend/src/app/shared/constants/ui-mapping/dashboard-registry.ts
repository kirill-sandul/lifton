import { Type } from "@angular/core";
import { UserRole } from "@core/models/user.models";
import { TrainerInfoWidgetComponent } from "@features/dashboard/components/client/trainer-info-widget/trainer-info-widget";
import { WorkoutWidgetComponent } from "@features/dashboard/components/client/workout-widget/workout-widget";

type WidgetList = {
  component: Type<any>,
  grid: string
}

export type DashboardWidgetRegistry = Record<UserRole, WidgetList[]>;

export const DASHBOARD_WIDGET_REGISTRY: DashboardWidgetRegistry = {
  CLIENT: [],
  TRAINER: [
    {
      component: WorkoutWidgetComponent,
      grid: 'grid-rows-1-2'
    },
    {
      component: TrainerInfoWidgetComponent,
      grid: 'grid-rows-3-4'
    }
  ]
}
