import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ErrorMsgComponent } from "./core/error-msg/error-msg.component";
import { ErrorMsgService } from './core/error-msg/error-msg.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AuthenticateComponent,
    ErrorMsgComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  error: string | null = null
  
  constructor(private errorMsgService: ErrorMsgService) {
    this.errorMsgService.apiError$.subscribe(error => this.error = error);
  }
};
