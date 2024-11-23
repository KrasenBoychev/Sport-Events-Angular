import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AllEventsPageComponent } from './all-events-page/all-events-page.component';
import { EventDetailsPageComponent } from './event-details-page/event-details-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'all-events', component: EventDetailsPageComponent },
    { path: 'login', component: LoginPageComponent},
    { path: 'register', component: RegisterPageComponent },
    { path: '404', component: ErrorPageComponent },
    { path: '**', redirectTo: '/404' },
];
