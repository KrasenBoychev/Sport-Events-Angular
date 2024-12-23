import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  domains = DOMAINS;

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get userId(): string {
    return this.userService.user?._id || '';
  }

  constructor(private userService: UserService, private router: Router) { }

  login(form: NgForm) {
    if (form.invalid) {
      console.error('Invalid Login Form!');
      return;
    }

    const { email, password } = form.value;

    this.userService.login(email, password).subscribe(() => {
      localStorage.setItem('user', JSON.stringify({ userId: this.userService.user?._id, email, username: this.userService.user?.username }));
      this.router.navigate(['/']);
    });
  }
}
