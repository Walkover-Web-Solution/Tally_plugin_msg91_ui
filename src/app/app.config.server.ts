import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideStore } from '@ngrx/store';
import { reducers } from './otp/store/app.state';
import { provideEffects } from '@ngrx/effects';
import { OtpEffects } from './otp/store/effects';
import { provideHttpClient } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
