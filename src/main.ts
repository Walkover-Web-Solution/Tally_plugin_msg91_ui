import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent,{
    ...appConfig,
    providers: [
      ...(appConfig.providers || []),
      provideRouter(routes, withHashLocation()) // enables hash-based routing
    ],
  }
)
  .catch((err) => console.error(err));
