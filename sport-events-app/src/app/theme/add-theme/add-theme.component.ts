import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-theme',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-theme.component.html',
  styleUrl: './add-theme.component.css',
})
export class AddThemeComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  addTheme(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { name, date, time, place, description } = form.value;

    this.apiService.createEvent(name, date, time, place, description).subscribe(() => {
      this.router.navigate(['/all-events']);
    });
  }
}
