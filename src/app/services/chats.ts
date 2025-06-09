import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Chat{
  
}

export interface ChatList{
  chats : Chat[]
}

@Injectable({
  providedIn: 'root'
})
export class Chats {

 
  private apiUrl = 'http://localhost:8080/api/chat/all'; 

  constructor(private http: HttpClient) {}

sendMessage(message: string): Observable<ChatList> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.get<ChatList>(this.apiUrl, { headers });
}
}
