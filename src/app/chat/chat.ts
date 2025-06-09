import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ChatbotService } from '../services/chatbot';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-chat',
  templateUrl: 'chat.html', 
  styleUrls: ['chat.css'],
  standalone: true,
})
export class ChatComponent implements AfterViewChecked, OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  userInput: string = '';
  messages: ChatMessage[] = [];
  isBotTyping: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private chatbotService: ChatbotService
  ) {}

  ngOnInit() {
    const savedChat = localStorage.getItem('kenyanConstitutionChatHistory');
    if (savedChat) {
      this.messages = JSON.parse(savedChat);
    } else {
      this.addBotMessage(
        'Hello! I can help answer questions about the Kenyan Constitution. What would you like to know?'
      );
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.addUserMessage(this.userInput);
    this.getBotResponse(this.userInput);
    this.userInput = '';
  }

  private addUserMessage(text: string) {
    this.messages.push({
      text: text,
      isUser: true,
      timestamp: new Date(),
    });
    this.saveChatHistory();
  }

  private addBotMessage(text: string) {
    this.messages.push({
      text: text,
      isUser: false,
      timestamp: new Date(),
    });
    this.saveChatHistory();
    this.scrollToBottom();
  }

  private getBotResponse(userInput: string) {
    this.isBotTyping = true;
    this.errorMessage = null;

    this.chatbotService.sendMessage(userInput).subscribe({
      next: (response) => {
        this.addBotMessage(response.reply);
        this.isBotTyping = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to get response. Please try again.';
        this.isBotTyping = false;
        console.error('Chatbot API error:', error);
      },
    });
  }

private scrollToBottom(): void {
    if (this.messagesContainer?.nativeElement) {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
}


  private saveChatHistory() {
    localStorage.setItem(
      'kenyanConstitutionChatHistory',
      JSON.stringify(this.messages)
    );
  }

  formatMessage(text: string) {
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }
}
