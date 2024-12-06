import { Injectable } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Event } from '../types/event';

export const allEventsResolver: ResolveFn<Event[]> = (route) => {
    const apiService = inject(ApiService);
    return apiService.getEvents();
};

export const singleEventResolver: ResolveFn<Event> = (route) => {
const apiService = inject(ApiService);
const id = route.paramMap.get('eventId')!;
return apiService.getSingleEvent(id);
};