import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/auth.model';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-login', standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],templateUrl: './login.component.html' })
export class LoginComponent {
  form = this.fb.group({ username: ['', Validators.required], password: ['', Validators.required] });
  error?: string;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}
  submit() {
  if (this.form.invalid) return;
  const payload = this.form.value as LoginRequest;
  this.auth.login(payload).subscribe({
    next: () => this.router.navigate(['/']),
    error: () => this.error = 'Credenciales inválidas'
  });
}
}