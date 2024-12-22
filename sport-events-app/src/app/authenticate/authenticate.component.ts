import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { UserForAuth } from '../types/user';
import { Observable } from 'rxjs';
import { ErrorMsgService } from '../core/error-msg/error-msg.service';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css',
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;

  constructor(private userService: UserService, private errorMsgService: ErrorMsgService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: () => {
        this.isAuthenticating = false;
      },
      error: () => {
        this.isAuthenticating = false;
      },
      complete: () => {
        if (!this.userService.user) {
          if (localStorage.getItem('user')) {
            localStorage.clear();
          }
        }

        this.errorMsgService.setError(null);
        this.isAuthenticating = false;
      },
    });
  }

}
