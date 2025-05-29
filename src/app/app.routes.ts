import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    {
        path: 'app',
        loadComponent: () => import('./tally-panel/tally-panel.component').then(m => m.TallyPanelComponent),
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent),
    },
    {
         path:'register',
         loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'layout',
        loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
        children: [
          {
            path: '',
            redirectTo: 'logs',
            pathMatch: 'full'
          },
          {
            path: 'logs',
            loadComponent: () => import('./logs/log/log.component').then((p) => p.LogComponent)
          }
        ]
      },
      {
          path: 'user',
          loadComponent: () => import('./user-layout/user-layout.component').then((p) => p.UserLayoutComponent),
          children: [
              {
                  path: '',
                  redirectTo: 'user-details',
                  pathMatch: 'full'
              },
              {
                 path: 'user-details',
                 loadComponent:() => import('./logs/user-log/user-log.component').then((p) => p.UserLogComponent)
              }
          ] 
      },
      {
        path:'**', redirectTo: 'app', pathMatch: 'full'
      }
];
