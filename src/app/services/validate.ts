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
  private apiUrl = 'https://0115-197-248-74-74.ngrok-free.app/api/users/auth/authenticate';

  constructor(private http: HttpClient) {}

  sendMessage(message: UserDto): Observable<UserResponse> {
    console.log(message)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<UserResponse>(this.apiUrl, message, { headers });
  }
}
