import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Event } from '../../types/event';

@Component({
  selector: 'app-user-events',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './user-events.component.html',
  styleUrl: '../all-events/all-events.component.css'
})
export class UserEventsComponent {
  events: Event[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.events = this.route.snapshot.data['events'];
    this.isLoading = false;
  }
}
