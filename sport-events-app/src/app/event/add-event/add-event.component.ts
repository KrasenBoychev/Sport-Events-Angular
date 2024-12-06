import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDay() + 2;
  minDate = moment({year: this.year, month: this.month, day: this.day}).format('YYYY-MM-DD');

  constructor(private apiService: ApiService, private router: Router) {}

  addEvent(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { name, date, time, place, textareaDescription } = form.value;

    this.apiService.createEvent(name, date, time, place, textareaDescription).subscribe(() => {
      this.router.navigate(['/all-events']);
    });
  }
}
