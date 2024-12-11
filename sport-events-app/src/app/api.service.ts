import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from './types/event';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<Event[]>('/api/events');
  }

  getUserEvents(userId: string | undefined) {
    return this.http.get<Event[]>(`/api/events/user/${userId}`);
  }

  getSingleEvent(id: string) {
    return this.http.get<Event>(`/api/events/${id}`);
  }

  createEvent(name: string, date: Date, time: string, place: string, description: string) {
    const payload = { name, date, time, place, description };
    return this.http.post<Event>(`/api/events`, payload);
  }

  updateEvent(eventId: string, name: string, date: Date | string, time: string, place: string, description: string) {
    const payload = { name, date, time, place, description };
    return this.http.put<Event>(`/api/events/update/${eventId}`, payload);
  }

  deleteEvent(eventId: string) {
    return this.http.delete(`/api/events/delete/${eventId}`);
  }

  addUserToEvent(userId: string, eventId: string) {
    const payload = { userId };
    return this.http.put<Event>(`/api/events/join/${eventId}`, payload);
  }

  removeUserFromEvent(userId: string, eventId: string) {
    const payload = { userId };
    return this.http.put<Event>(`/api/events/cancel/${eventId}`, payload);
  }
}
