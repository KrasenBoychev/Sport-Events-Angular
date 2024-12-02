import { Component } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '../../shared/pipes/slice.pipe'; // If not in use - DELETE
import { DatePipe } from '@angular/common';  // If not in use - DELETE
import { ApiService } from '../../api.service';
import { Event } from '../../types/event';

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [LoaderComponent, RouterLink, SlicePipe, DatePipe],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})
export class AllEventsComponent {
  events: Event[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getEvents().subscribe((events) => {
      this.events = events;
      this.isLoading = false;
    });
  }
}
