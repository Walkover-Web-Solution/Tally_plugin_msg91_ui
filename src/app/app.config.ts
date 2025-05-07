import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { OtpEffects } from '../app/otp/send-otp/store/effects/otp.effects';
import { otpReducer } from './otp/send-otp/store/reducers/otp.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideAnimations } from '@angular/platform-browser/animations';
import { ProxyLogsComponentStore } from './logs/log/logs.store';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
              provideHttpClient(),
              provideStore({otp:otpReducer}),
              provideEffects([OtpEffects]),
              provideStoreDevtools(),
              provideAnimations(),
              ProxyLogsComponentStore
  ]
};

