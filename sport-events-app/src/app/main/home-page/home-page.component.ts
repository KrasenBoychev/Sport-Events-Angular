import { Component, OnInit } from '@angular/core';
import { Light } from '../../types/light';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  lights: Light[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getLights().subscribe((lights) => {
      this.lights = lights
      console.log(lights);
      
    });
  }
}
