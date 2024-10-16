import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const AuthInterceptorService: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  const clonedReq = authToken ? req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  }) : req;

  return next(clonedReq);
};
