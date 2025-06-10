import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Validate } from '../services/validate';
import { Router } from '@angular/router';

export interface UserDto {
  username: string;
  password: string;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class AuthComponent {
  username: string = '';
  password: string = '';

  constructor(private authoriser: Validate,private router: Router) {}

  login() {
    const payload: UserDto = {
      username: this.username,
      password: this.password
    };

    console.log(`${this.username}, ${this.password}`);
    console.log('Hitting endpoint');

    this.authoriser.sendMessage(payload).subscribe({
      next: (token) => {
        console.log('Received token:', token);
        localStorage.setItem(
          'kenyanConstitutionChatHistoryToken',
          token.token
        )
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Login failed', err);
        // show error message to user if needed
      }
    });
  }
}
