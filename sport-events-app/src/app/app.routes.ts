import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AllEventsPageComponent } from './all-events-page/all-events-page.component';
import { EventDetailsPageComponent } from './event-details-page/event-details-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'all-events', component: EventDetailsPageComponent },

    // {
    //     path: '',
    //     children: [
    //       { path: '', component: MainComponent },
    //       {
    //         // path: 'details/:id',
    //         // component: UserDetailsComponent,
    //         // canActivate: [AuthGuard],
    //         // resolve: { user: UserDetailsResolver },
    //       },
    //     ],
    //   },

    {
        path: '**',
        component: ErrorPageComponent,
    },
];
