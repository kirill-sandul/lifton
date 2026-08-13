import { Routes } from '@angular/router';

import { authGuard } from '@core/guards/auth.guard';
import { guestGuard } from '@core/guards/guest.guard';
import { trainerRoleGuard } from '@core/guards/trainer-role.guard';

import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout';
import { AppLayoutComponent } from '@layouts/app-layout/app-layout';
import { SearchLayoutComponent } from '@layouts/search-layout/search-layout';

import { LoginPageComponent } from '@features/auth/pages/login-page/login-page';
import { RegisterPageComponent } from '@features/auth/pages/register-page/register-page';
import { RegisterQuizPage } from '@features/auth/pages/register-quiz-page/register-quiz-page';

import { DashboardPageComponent } from '@features/dashboard/pages/dashboard-page/dashboard-page';

import { ProfilePageComponent } from '@features/profile/pages/profile-page/profile-page';
import { SearchPageComponent } from '@features/search/pages/search-page/search-page';
import { CreateProgramPageComponent } from '@features/programs/create-program/pages/create-program-page/create-program-page';
import { ProgramsLibPageComponent } from '@features/programs/programs-lib/pages/programs-lib-page/programs-lib-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent,
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
      {
        path: 'search',
        component: SearchLayoutComponent,
        canActivate: [authGuard],
        children: [
          {
            path: '',
            component: SearchPageComponent,
          },
        ],
      },
      {
        path: 'create-program',
        component: CreateProgramPageComponent,
        canActivate: [authGuard, trainerRoleGuard],
      },
      {
        path: 'programs',
        component: ProgramsLibPageComponent,
        canActivate: [authGuard, trainerRoleGuard],
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
    ],
  },
  {
    path: 'auth/register/quiz',
    component: RegisterQuizPage,
    canActivate: [guestGuard],
  },
];
