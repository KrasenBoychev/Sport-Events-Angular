import { Component } from '@angular/core';
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
export class SingleEventComponent {
  event = {} as Event;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get userId(): string {        
    return this.userService.user?._id || '';
  }

  ngOnInit(): void {
    this.event = this.route.snapshot.data['event'];
  }
}
