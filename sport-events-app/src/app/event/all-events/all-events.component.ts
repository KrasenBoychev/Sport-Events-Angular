import { Component } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.events = this.route.snapshot.data['events'];
    this.isLoading = false;
  }
}
