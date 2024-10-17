import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgOptimizedImage } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';

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
  providers: [AuthService],
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
      try {
        this.loginService.login(this.email, this.password);
        this.router.navigateByUrl('/dashboard');
      } catch (error: any) {
        this.errorMessages = [{ severity: 'error', summary: error.message }];
      }
    }
  }
}
