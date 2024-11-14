import { Component } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { AllEventsPageComponent } from './all-events-page/all-events-page.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HomePageComponent, AllEventsPageComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
