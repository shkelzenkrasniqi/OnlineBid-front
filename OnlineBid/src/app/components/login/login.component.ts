import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-login',
  standalone: true,  // Indicate it's a standalone component
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [FormsModule]  // Import FormsModule for form handling
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        localStorage.setItem('jwtToken', response.token);  // Store the JWT token
        this.router.navigate(['/']);  // Navigate to dashboard on success
      },
      (error) => {
        this.errorMessage = 'Login failed!';
        console.error(error);
      }
    );
  }
}
