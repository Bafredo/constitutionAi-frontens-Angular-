import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat';
import { Picker } from './chatlist/picker/picker';
import { AuthComponent } from './auth/auth';
import { RootRedirectGuard } from './auth/root-redirect-guard';

export const routes: Routes = [
  { path: 'chat/:id', component: ChatComponent },
  { path: '', canActivate: [RootRedirectGuard], component: Picker },
   { path: 'auth', component : AuthComponent}, 
   { path: 'picker', component: Picker}
];
