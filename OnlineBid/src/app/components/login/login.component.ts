import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [FormsModule]
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router,private toastr: ToastrService) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        localStorage.setItem('jwtToken', response.token);
        this.router.navigate(['/']);
      },
      () => {
        this.toastr.error("Login Failed!")
      }
    );
  }
}
