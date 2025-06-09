import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat';
import { Picker } from './chatlist/picker/picker';
import { Auth } from './auth/auth';

export const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: '', component : Picker}, 
   { path: 'auth', component : Auth}, 
];
