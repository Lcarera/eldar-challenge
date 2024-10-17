import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    NgOptimizedImage,
    FormsModule,
    MessagesModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessages: Message[] = [];

  loginService = inject(AuthService);
  router = inject(Router);
  constructor() {}

  login(form: NgForm): void {
    this.errorMessages = [];
    if (form.valid) {
      this.loginService.login$(this.email, this.password).subscribe({
        next: (_) => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessages = [{ severity: 'error', summary: error.message }];
        },
      });
    }
  }
}
