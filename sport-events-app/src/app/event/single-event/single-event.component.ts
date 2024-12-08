import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { Event } from '../../types/event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-event',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './single-event.component.html',
  styleUrl: './single-event.component.css'
})
export class SingleEventComponent implements OnInit {
  event = {} as Event;
  hasJoined: boolean | null = null;

  get userId(): string {        
    return this.userService.user?._id || '';
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.event = this.route.snapshot.data['event'];

    if (this.event.usersJoined.includes(this.userId)) {
      this.hasJoined = true;
    } else {
      this.hasJoined = false;
    }
  }

  onJoinEvent() {
    this.apiService.addUserToEvent(this.userId, this.event._id).subscribe(() => {
      this.hasJoined = true;
    });
  }

  onCancelEvent() {
    this.apiService.removeUserFromEvent(this.userId, this.event._id).subscribe(() => {
      this.hasJoined = false;
    });
  }
  
}
