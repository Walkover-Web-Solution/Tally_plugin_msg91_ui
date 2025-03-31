import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
     path: 'app',
     loadChildren: () => import('./layout/layout.module').then((p) => p.LayoutModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then((p)=> p.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }

