import { Routes } from '@angular/router';

import { authGuard } from '@core/guards/auth.guard';
import { guestGuard } from '@core/guards/guest.guard';

import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout';
import { AppLayoutComponent } from '@layouts/app-layout/app-layout';
import { LoginPageComponent } from '@features/auth/pages/login-page/login-page';
import { RegisterPageComponent } from '@features/auth/pages/register-page/register-page';
import { RegisterQuizPage } from '@features/auth/pages/register-quiz-page/register-quiz-page';

import { DashboardPageComponent } from '@features/dashboard/pages/dashboard-page/dashboard-page';
import { ProfilePageComponent } from '@features/profile/pages/profile-page/profile-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent
      },
      {
        path: 'profile',
        component: ProfilePageComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: RegisterPageComponent
      },
    ],
  },
  {
    path: 'auth/register/quiz',
    component: RegisterQuizPage,
    canActivate: [guestGuard],
  }
];
