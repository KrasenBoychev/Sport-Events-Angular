import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Event } from '../types/event';
import { UserService } from '../user/user.service';
import { EventService } from '../event/event.service';
import { Subscription } from 'rxjs';

export const allEventsResolver: ResolveFn<Event[]> = (route) => {
    const apiService = inject(ApiService);
    return apiService.getEvents();
};

export const userEventsResolver: ResolveFn<Event[]> = (route) => {
    const apiService = inject(ApiService);
    const userService = inject(UserService);
    let userId;
    userService.user$.subscribe(user => userId = user?._id);
    return apiService.getUserEvents(userId);
};

export const singleEventResolver: ResolveFn<Event> = (route) => {
    const apiService = inject(ApiService);
    const id = route.paramMap.get('eventId')!;
    return apiService.getSingleEvent(id);
};

export const editEventResolver: ResolveFn<{ currEvent: Event, subscription: Subscription}> = (route) => {
    const eventService = inject(EventService);
    const router = inject(Router);
    const id = route.paramMap.get('eventId')!;

    let subscription = null;
    let currEvent = null;

    subscription = eventService.currentEvent.subscribe(event => currEvent = event);

    if (!currEvent) {
        currEvent = JSON.parse(localStorage.getItem('eventDetails')!);
    }

    if (!currEvent) {
        router.navigate([`/all-events/${id}`]);
    }

    return { currEvent, subscription };
};