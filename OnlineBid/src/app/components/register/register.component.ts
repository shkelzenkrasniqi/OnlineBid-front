import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-register',
  standalone: true,  // Indicate it's a standalone component
  templateUrl: './register.component.html',
  imports: [FormsModule]  // Import FormsModule to handle forms
})
export class RegisterComponent {
  user = { firstname:'',lastname:'',username: '', email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe(
      () => this.router.navigate(['/login']),  // Navigate to login on success
      (error) => {
        this.errorMessage = 'Registration failed!';
        console.error(error);
      }
    );
  }
}
