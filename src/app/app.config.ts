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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { providePrimeNG } from 'primeng/config';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),   // Optimize Change Detection
    provideRouter(routes),                                   //   App Routing
    provideClientHydration(withEventReplay()),                // SSR Hydration Support
    provideHttpClient(),                                      // HTTP Client
    provideStore({ otp: otpReducer }),                            //NGRX store setup
    provideEffects([OtpEffects]),                             //NGRX store effects
    provideStoreDevtools(),                                    //Devtools for debugging
    provideAnimations(),                                       // provide animation
    ProxyLogsComponentStore,                                   // Logs 
    MessageService,                                            //Prime Ng Service
    ToastModule,                                               // ToastModule
    providePrimeNG({ ripple: true })                           // PrimeNg Config

  ]
};



