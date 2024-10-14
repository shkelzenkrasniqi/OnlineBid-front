import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [FormsModule]
})
export class RegisterComponent {
  user = { firstname:'',lastname:'',username: '', email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe(
      () => this.router.navigate(['/login']),
      (error) => {
        this.errorMessage = 'Registration failed!';
        console.error(error);
      }
    );
  }
}
