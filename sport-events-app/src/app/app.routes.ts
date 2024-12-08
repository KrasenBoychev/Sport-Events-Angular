import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { NonAuthGuard } from './guards/nonAuth.guard';
import { AllEventsComponent } from './event/all-events/all-events.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { SingleEventComponent } from './event/single-event/single-event.component';
import { allEventsResolver, singleEventResolver } from './guards/event-resolvers.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent, },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'all-events',
    children: [
      { path: '', component: AllEventsComponent, resolve: { events: allEventsResolver } },
      {
        path: ':eventId',
        component: SingleEventComponent,
        resolve: { event: singleEventResolver },
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'add-event', component: AddEventComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorMsgComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
