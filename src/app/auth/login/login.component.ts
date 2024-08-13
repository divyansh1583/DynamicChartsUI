import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoginDetails } from '../../shared/modals/login.modal';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginForm: FormGroup;
  hide: any;
  passwordVisible: any;
  loginDetails: LoginDetails = { email: '', password: '' };

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.loginDetails.email = this.loginForm.value.email!;
    this.loginDetails.password = this.loginForm.value.password!;
    if (this.loginForm.valid) {
      console.log(this.loginDetails);
      this.authService.login(this.loginDetails).subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
        
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 1); // Set cookie to expire in 7 days
            this.cookieService.set('login_token', res.data.token, expiryDate);
  
            this.router.navigate(['/user/dashboard']);
            this.toastr.success(res.message);
          } else {
            console.log(res);
            this.toastr.error(res.message);
          }
        },
        error: (err) => {
          this.toastr.error(err.message);
        }
      });
    } else {
      this.toastr.error('Invalid Credentials!');
    }
  }
}
