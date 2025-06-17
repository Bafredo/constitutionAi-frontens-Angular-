import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RootRedirectGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('kenyanConstitutionChatHistoryToken');
    if (token) {
      this.router.navigate(['/picker']);
    } else {
      this.router.navigate(['/auth']);
    }
    return false; // Prevent actual activation of this dummy route
  }
}
