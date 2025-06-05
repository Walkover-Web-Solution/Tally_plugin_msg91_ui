import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

// Routing Modules
export const routes: Routes = [

  // Default route redirects to 'app'
  { path: '', redirectTo: 'app', pathMatch: 'full' },

  //  App route
  {
    path: 'app',
    loadComponent: () => import('./tally-panel/tally-panel.component').then(m => m.TallyPanelComponent),
  },

  // Login route
  {
    path: 'login',
    loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent),
  },

  // Register route
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  },

  // Layout route with child routes
  {
    path: 'layout',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      // Redirect default child to 'logs'
      {
        path: '',
        redirectTo: 'logs',
        pathMatch: 'full'
      },

      // Logs child route under layout
      {
        path: 'logs',
        loadComponent: () => import('./logs/log/log.component').then((p) => p.LogComponent)
      }
    ]
  },

  // User route with child routes
  {
    path: 'user',
    loadComponent: () => import('./user-layout/user-layout.component').then((p) => p.UserLayoutComponent),
    children: [
      // Redirect default child to 'user-details'
      {
        path: '',
        redirectTo: 'user-details',
        pathMatch: 'full'
      },

      // User details child route
      {
        path: 'user-details',
        loadComponent: () => import('./logs/user-log/user-log.component').then((p) => p.UserLogComponent)
      }
    ]
  },

  // Wildcard route redirects to 'app'
  {
    path: '**', redirectTo: 'app', pathMatch: 'full'
  }
];
