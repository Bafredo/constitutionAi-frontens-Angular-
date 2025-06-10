import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserDto {
  username: string;  
  password: string;
}
export interface UserResponse{
  username: string;  
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class Validate {
  private apiUrl = 'http://localhost:8080/api/users/auth/authenticate';

  constructor(private http: HttpClient) {}

  sendMessage(message: UserDto): Observable<UserResponse> {
    console.log(message)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<UserResponse>(this.apiUrl, message, { headers });
  }
}
