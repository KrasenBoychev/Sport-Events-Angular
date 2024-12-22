import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventDetails, Event as EventType } from '../../types/event';
import moment from 'moment';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent implements OnInit, OnDestroy {
  event: EventType | null = null;
  subscription: Subscription | null = null;
  resolverData: { currEvent: EventType, subscription: Subscription } | null = null;

  eventDetails: EventDetails = {
    name: '',
    date: null,
    time: '',
    place: '',
    description: ''
  };

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    date: new FormControl('', [
      Validators.required,
    ]),
    time: new FormControl('', [
      Validators.required
    ]),
    place: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
  });

  get today() {
    return moment().add(1, 'day').format('YYYY-MM-DD');
  }

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.resolverData = this.route.snapshot.data['currEvent'];

    if (this.resolverData?.currEvent) {
      this.event = this.resolverData.currEvent;
      this.subscription = this.resolverData.subscription;

      const formatDate = moment(this.event!.date).format('YYYY-MM-DD');

      this.eventDetails = {
        name: this.event!.name,
        date: this.event!.date,
        time: this.event!.time,
        place: this.event!.place,
        description: this.event!.description,
      };

      this.form.setValue({
        name: this.event!.name,
        date: formatDate,
        time: this.event!.time,
        place: this.event!.place,
        description: this.event!.description,
      });
    }
  }

  ngOnDestroy() {
    this.subscription!.unsubscribe();
    localStorage.removeItem('eventDetails');
  }

  editEvent() {
    if (this.form.invalid) {
      return;
    }

    const { name, date, time, place, description } = this.form.value;

    let eventId = this.route.snapshot.params['eventId'];

    this.apiService.updateEvent(this.event!._id, name!, date!, time!, place!, description!).subscribe(() => {
      this.router.navigate([`/all-events/${eventId}`]);
    });
  }

  onCancelEditEvent(event: Event) {
    event.preventDefault();
    let eventId = this.route.snapshot.params['eventId'];
    this.router.navigate([`/all-events/${eventId}`]);
  }
}
