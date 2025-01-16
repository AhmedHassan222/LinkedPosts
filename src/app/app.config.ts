import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from '../Cores/Interceptors/header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes , withInMemoryScrolling({scrollPositionRestoration: 'top'})), 
    provideClientHydration(),
    provideHttpClient(withFetch() , withInterceptors([headerInterceptor])), // to enable httpclient(API)
  
  ]
};
