import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {
    if (this.authService.isLoggedIn() && this.authService.getUserRoles().includes('Admin')) {
      return true;
    }
    this.router.navigate(['/forbidden']);
    return false;
  };
}
