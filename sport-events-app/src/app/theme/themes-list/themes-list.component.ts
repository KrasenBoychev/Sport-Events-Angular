import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Event } from '../../types/event';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-themes-list',
  standalone: true,
  imports: [LoaderComponent, RouterLink, SlicePipe, DatePipe],
  templateUrl: './themes-list.component.html',
  styleUrl: './themes-list.component.css',
})
export class ThemesListComponent implements OnInit {
  events: Event[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getEvents().subscribe((events) => {
      this.events = events;
      this.isLoading = false;
    });
  }
}
