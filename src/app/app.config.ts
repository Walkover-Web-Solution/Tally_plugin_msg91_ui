import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { otpReducer } from './otp/store/reducers/otp.reducers';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { reducers } from './otp/store/app.state';
import { OtpEffects } from './otp/store/effects';
import { servicesproxy } from './services/proxyservices.service';
import { provideStoreDevtools } from '@ngrx/store-devtools'

export const appConfig: ApplicationConfig = {
  providers: [
                provideZoneChangeDetection({ eventCoalescing: true }), provideClientHydration(withEventReplay()),
                provideRouter(routes),
                provideHttpClient(),
                provideStore({otp:otpReducer}),
                provideEffects([OtpEffects]),
                provideStoreDevtools()
            ]   
};2


