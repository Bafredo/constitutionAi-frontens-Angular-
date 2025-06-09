import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BotResponse {
  reply: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'http://localhost:8080/api/constitution/ask'; 

  constructor(private http: HttpClient) {}

sendMessage(message: string): Observable<BotResponse> {
  const payload = { question: message };
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<BotResponse>(this.apiUrl, payload, { headers });
}
}
