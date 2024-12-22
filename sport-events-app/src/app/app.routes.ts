import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard, LoggedInGuard } from './guards/auth.guard';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { AllEventsComponent } from './event/all-events/all-events.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { SingleEventComponent } from './event/single-event/single-event.component';
import { allEventsResolver, editEventResolver, singleEventResolver, userEventsResolver } from './guards/event-resolvers.guard';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { UserEventsComponent } from './event/user-events/user-events.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard]},
  {
    path: 'all-events',
    children: [
      { path: '', component: AllEventsComponent, resolve: { events: allEventsResolver } },
      {
        path: ':eventId',
        component: SingleEventComponent,
        resolve: { event: singleEventResolver },
      },
    ],
  },
  {
    path: 'user-events',
    children: [
      { path: '', component: UserEventsComponent, resolve: { events: userEventsResolver }, canActivate: [AuthGuard]  },
      {
        path: ':eventId',
        component: SingleEventComponent,
        resolve: { event: singleEventResolver },
        canActivate: [AuthGuard] 
      },
    ],
  },
  { path: 'add-event', component: AddEventComponent, canActivate: [AuthGuard] },
  { path: 'edit-event/:eventId', component: EditEventComponent, resolve: { currEvent: editEventResolver }, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorMsgComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
