import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5080';  // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  register(user: { firstname: string,lastname: string,username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/account/register`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/account/login`, credentials);
  }
}
