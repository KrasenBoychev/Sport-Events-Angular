import { Component } from '@angular/core';
import {
  RouterOutlet,
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ErrorMsgComponent } from "./core/error-msg/error-msg.component";
import { ErrorMsgService } from './core/error-msg/error-msg.service';
import { LoaderComponent } from "./shared/loader/loader.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AuthenticateComponent,
    ErrorMsgComponent,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  error: string | null = null;
  loading = false;

  constructor(private errorMsgService: ErrorMsgService, private router: Router) {
    this.errorMsgService.apiError$.subscribe(error => this.error = error);

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
};
