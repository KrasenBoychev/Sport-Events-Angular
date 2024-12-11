import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { Event } from '../../types/event';
import { DatePipe } from '@angular/common';
import { DataService } from '../event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-event',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './single-event.component.html',
  styleUrl: './single-event.component.css'
})
export class SingleEventComponent implements OnInit, OnDestroy {
  event = {} as Event;
  hasJoined: boolean | null = null;
  eventPeopleJoined: number | null = null;
  isDeleteBtnClicked: boolean = false;

  get userId(): string {
    return this.userService.user?._id || '';
  }

  message: Event | null = null;
  subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private data: DataService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.event = this.route.snapshot.data['event'];

    if (this.event.usersJoined.includes(this.userId)) {
      this.hasJoined = true;
    } else {
      this.hasJoined = false;
    }

    this.eventPeopleJoined = this.event.usersJoined.length;

    this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
  }

  ngOnDestroy() {
    this.subscription!.unsubscribe();
  }

  onJoinEvent() {
    this.apiService.addUserToEvent(this.userId, this.event._id).subscribe(() => {
      this.eventPeopleJoined! += 1;
      this.hasJoined = true;
    });
  }

  onCancelEvent() {
    this.apiService.removeUserFromEvent(this.userId, this.event._id).subscribe(() => {
      this.eventPeopleJoined! -= 1;
      this.hasJoined = false;
    });
  }

  onEditEvent() {
    this.data.changeMessage(this.event);
    this.router.navigate([`/edit-event/${this.event._id}`]);
  }

  onDeleteEvent() {
    this.apiService.deleteEvent(this.event._id).subscribe(() => {
      this.router.navigate([`/all-events`]);
    });
  }

  onDeletePopUp() {
    this.isDeleteBtnClicked = true;
  }

  onDeleteCancelPopUp() {
    this.isDeleteBtnClicked = false;
  }
}
