import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat';
import { Picker } from './chatlist/picker/picker';
import { AuthComponent } from './auth/auth';

export const routes: Routes = [
  { path: 'chat/:id', component: ChatComponent },
  { path: '', component : Picker}, 
   { path: 'auth', component : AuthComponent}, 
];
