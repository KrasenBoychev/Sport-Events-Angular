import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { Event } from '../../types/event';
import { DatePipe } from '@angular/common';
import { EventService } from '../event.service';

@Component({
  selector: 'app-single-event',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './single-event.component.html',
  styleUrl: './single-event.component.css'
})
export class SingleEventComponent implements OnInit {
  event = {} as Event;
  hasJoined: boolean | null = null;
  eventPeopleJoined: number | null = null;
  isDeleteBtnClicked: boolean = false;

  get userId(): string {
    return this.userService.user?._id || '';
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private eventService: EventService,
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
    this.eventService.changeEvent(this.event);
    localStorage.setItem('eventDetails', JSON.stringify(this.event));
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
