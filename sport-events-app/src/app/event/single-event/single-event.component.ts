import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { Event } from '../../types/event';

@Component({
  selector: 'app-single-event',
  standalone: true,
  imports: [],
  templateUrl: './single-event.component.html',
  styleUrl: './single-event.component.css'
})
export class SingleEventComponent {
  event = {} as Event;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['eventId'];

    this.apiService.getSingleEvent(id).subscribe((event: Event) => {
      this.event = event;
    });
  }
}
