import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  // In a real app, this would be stored securely, not in memory
  private userRoles: string[] = [];

  constructor() {
    // Check if user is logged in from localStorage (for persistence)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      this.isLoggedInSubject.next(true);
      this.userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    }
  }

  login(username: string, password: string): boolean {
    // In a real app, this would validate against a backend
    if (username === 'admin' && password === 'admin123') {
      this.isLoggedInSubject.next(true);
      this.userRoles = ['admin'];
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRoles', JSON.stringify(this.userRoles));
      return true;
    } else if (username === 'user' && password === 'user123') {
      this.isLoggedInSubject.next(true);
      this.userRoles = ['user'];
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRoles', JSON.stringify(this.userRoles));
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.userRoles = [];
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRoles');
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
  
  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }
}
