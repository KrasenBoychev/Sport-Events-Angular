import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Event } from '../types/event';
import { UserService } from '../user/user.service';

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