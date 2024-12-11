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
import { DataService } from '../event.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent implements OnInit, OnDestroy {
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

  message: EventType | null = null;
  subscription: Subscription | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message);

    const formatDate = moment(this.message!.date).format('YYYY-MM-DD');

    this.eventDetails = {
      name: this.message!.name,
      date: this.message!.date,
      time: this.message!.time,
      place: this.message!.place,
      description: this.message!.description,
    };

    this.form.setValue({
      name: this.message!.name,
      date: formatDate,
      time: this.message!.time,
      place: this.message!.place,
      description: this.message!.description,
    });
  }

  ngOnDestroy() {
    this.subscription!.unsubscribe();
  }

  editEvent() {
    if (this.form.invalid) {
      return;
    }

    const { name, date, time, place, description } = this.form.value;

    let eventId = this.route.snapshot.params['eventId'];

    this.apiService.updateEvent(this.message!._id, name!, date!, time!, place!, description!).subscribe(() => {
      this.router.navigate([`/all-events/${eventId}`]);

    });
  }

  onCancelEditEvent(event: Event) {
    event.preventDefault();
    let eventId = this.route.snapshot.params['eventId'];
    this.router.navigate([`/all-events/${eventId}`]);
  }
}
