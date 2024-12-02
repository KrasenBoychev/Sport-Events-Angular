import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddThemeComponent } from './theme/add-theme/add-theme.component';
import { CurrentThemeComponent } from './theme/current-theme/current-theme.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { NonAuthGuard } from './guards/nonAuth.guard';
import { ThemesListComponent } from './theme/themes-list/themes-list.component';
import { AllEventsComponent } from './event/all-events/all-events.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { SingleEventComponent } from './event/single-event/single-event.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  //   Start - User routing
  { path: 'login', component: LoginComponent, canActivate:[NonAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate:[NonAuthGuard] },
  { path: 'profile', component: ProfileComponent },
  // { path: 'all-events', component: AllEventsComponent},
  { path: 'add-event', component: AddEventComponent},

  //   End - User routing

  // Start - Theme routing
  {
    path: 'all-events',
    children: [
      { path: '', component: AllEventsComponent },
      {
        path: ':eventId',
        component: SingleEventComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  //   path: 'add-theme',
  //   loadComponent: () =>
  //     import('./theme/add-theme/add-theme.component').then(
  //       (c) => c.AddThemeComponent
  //     ),
  //   // canActivate: [AuthGuard],
  // },
  // End - Theme routing

  { path: 'error', component: ErrorMsgComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
