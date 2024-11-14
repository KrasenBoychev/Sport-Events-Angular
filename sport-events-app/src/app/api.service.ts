import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Light } from './types/light';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLights() {
    const {apiUrl} = environment;
    let url = `${apiUrl}/data/catalog/668cfe59f18d95a1f2f52a13`;

    // if (limit) {
    //   url += `?limit=${limit}`;
    // }

    return this.http.get<Light[]>(url);
  }
}
