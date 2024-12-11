import { Event } from '../types/event';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject<Event | null>(null);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: Event) {
    this.messageSource.next(message);
  }
}

