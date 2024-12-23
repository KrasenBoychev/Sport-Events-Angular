import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Event } from '../../types/event';

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [RouterLink],
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
