import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './types/post';
import { Event } from './types/event';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPosts(limit?: number) {
    let url = `/api/posts`;
    if (limit) {
      url += `?limit=${limit}`;
    }

    return this.http.get<Post[]>(url);
  }

  // getThemes() {
  //   return this.http.get<Theme[]>(`/api/themes`);
  // }

  getEvents() {
    return this.http.get<Event[]>('/api/events');
  }

  // getSingleTheme(id: string) {
  //   return this.http.get<Theme>(`/api/themes/${id}`);
  // }

  getSingleEvent(id: string) {
    return this.http.get<Event>(`/api/events/${id}`);
  }

  createEvent(name: string, date: Date, time: string, place: string) {
    const payload = { name, date, time, place };
    return this.http.post<Event>(`/api/events`, payload);
  }

  // CRUD operations
  // update -> http.put
  // updateTheme(themeId: string, themeName: string, postText: string) {
  //   const payload = { themeName, postText };
  //   return this.http.put<Theme>(`/api/themes/${themeId}`, payload);
  // }

  // updatePost(themeId: string, postId: string) {
  //   const payload = {};
  //   return this.http.put<Theme>(
  //     `/api/themes/${themeId}/posts/${postId}`,
  //     payload
  //   );
  // }

  // delete -> http.delete theme ID
  deletePost(themeId: string, postId: string) {
    return this.http.delete(`/api/themes/${themeId}/posts/${postId}`);
  }
}
