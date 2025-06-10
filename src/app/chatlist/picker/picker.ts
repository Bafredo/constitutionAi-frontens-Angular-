import { Component, OnInit } from '@angular/core';
import { Chats } from '../../services/chats';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface ChatDto {
  id:Number
  title: string;
  recent: string;
  timestamp: Date;
}

export interface ChatList {
  chats: ChatDto[];
}

@Component({
  selector: 'app-picker',
  imports: [FormsModule, CommonModule],
  templateUrl: './picker.html',
  styleUrl: './picker.css'
})
export class Picker implements OnInit {
  constructor(
    private chats : Chats,
    private router : Router
  ){}
  list : ChatDto[] = [] 

  ngOnInit(): void {
      this.chats.getList().subscribe({
          next: (it)=>{
              this.list = it
          },
          error: (err)=>{
                console.error(err)
          }
      })
  }
  navigateToChat(id : Number){
      this.router.navigate(['/chat',id])
  }
  newChat(){
    this.router.navigate(['/chat',0])
  }

  

}
