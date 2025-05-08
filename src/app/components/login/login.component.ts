import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  returnUrl = '';
  loginError = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get return URL from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // Already logged in? Redirect
    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  login(): void {
    this.loginError = '';
    if (this.username && this.password) {
      const success = this.authService.login(this.username, this.password);
      if (success) {
        this.router.navigate([this.returnUrl]);
      } else {
        this.loginError = 'Invalid username or password';
      }
    } else {
      this.loginError = 'Please enter both username and password';
    }
  }
}
