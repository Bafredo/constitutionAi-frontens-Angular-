import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ChatDto {
  id:Number,
  title: string;
  recent: string;
  timestamp: Date;
}
interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}



@Injectable({
  providedIn: 'root'
})
export class Chats {

  private apiUrl = 'https://constitutuionai-backend.onrender.com/api/chat/all'; 

  constructor(private http: HttpClient) {}

  getList(): Observable<ChatDto[]> {
    const token = localStorage.getItem('kenyanConstitutionChatHistoryToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });

    return this.http.get<ChatDto[]>(this.apiUrl, { headers });
  }
  getMessages(chatId : string | null):Observable<ChatMessage[]>{
    var apiUrl : string = 'https://constitutuionai-backend.onrender.com/api/chat/messages/'+chatId
    const token = localStorage.getItem('kenyanConstitutionChatHistoryToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });


    return this.http.get<ChatMessage[]>(apiUrl, { headers });
  }
}
