import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/store/reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './auth/store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(authEffects),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
