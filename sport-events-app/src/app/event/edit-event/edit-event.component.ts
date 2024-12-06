import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { minDate } from '../../utils/setMinDate';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent {
  minDate = minDate();

  constructor(private apiService: ApiService, private router: Router) {}

  editEvent(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { name, date, time, place, textareaDescription } = form.value;

    // this.apiService.createEvent(name, date, time, place, textareaDescription).subscribe(() => {
    //   this.router.navigate(['/all-events']);
    // });
  }
}
