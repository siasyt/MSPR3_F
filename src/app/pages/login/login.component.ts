import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showRegister: boolean = false;
  loginFailed: boolean = false;
  errorMessage: string = 'Identifiants incorrects. Veuillez réessayer.';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.access_token); // 修改这里
        console.log('Stored JWT Token:', localStorage.getItem('token')); // 确认存储的 JWT 令牌
        this.loginFailed = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login error', error);
        this.loginFailed = true;
      }
    });
  }

  register(): void {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    this.authService.register(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        alert('Registration successful! Please login.');
        this.showRegister = false;
      },
      error: (error) => {
        console.error('Registration error', error);
      }
    });
  }

  showRegisterForm(): void {
    this.showRegister = true;
  }

  showLoginForm(): void {
    this.showRegister = false;
  }
}

