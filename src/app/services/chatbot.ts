import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BotResponse {
  reply: string;
  chatId:string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'https://constitution-71f9fa9ad6e8.herokuapp.com/api/constitution/ask'; 

  constructor(private http: HttpClient) {}

sendMessage(message: string, chatid: string | null): Observable<BotResponse> {
  let payload: { question: string; chatId?: string | null } = { question: message };
  if (chatid) {
    payload.chatId = chatid;
  }

  
  const token = localStorage.getItem('kenyanConstitutionChatHistoryToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
  return this.http.post<BotResponse>(this.apiUrl, payload, { headers });
}
}
