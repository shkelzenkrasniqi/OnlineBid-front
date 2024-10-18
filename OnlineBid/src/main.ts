import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { AuthInterceptorService } from './app/services/auth/auth-interceptor.service';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
registerSwiperElements();

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(),
    provideToastr({ positionClass: 'toast-top-center' }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptorService]))
  ]
});
