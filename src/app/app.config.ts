import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IndividualConfig, provideToastr} from 'ngx-toastr';
import { HTTP_INTERCEPTORS, provideHttpClient} from '@angular/common/http';
import { LoaderInterceptor} from './interceptors/loader.interceptor';

const toastrConfig: Partial<IndividualConfig> = {
  timeOut: 3000, // Duration before the toast disappears
  positionClass: 'toast-bottom-right', // Position of the toast
  closeButton: true, // Show close button
  progressBar: true, // Show progress bar
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(),
    provideToastr(toastrConfig),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ]
};
