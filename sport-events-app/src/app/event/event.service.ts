import { Event } from '../types/event';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventSource = new BehaviorSubject<Event | null>(null);
  currentEvent = this.eventSource.asObservable();

  constructor() { }

  changeEvent(event: Event) {
    this.eventSource.next(event);
  }
}

