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

  private apiUrl = 'https://0115-197-248-74-74.ngrok-free.app/api/constitution/ask'; 

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
