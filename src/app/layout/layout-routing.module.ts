import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";

const routes: Routes = [
        {
            path: '',
            component: LayoutComponent,
            children: [
                    {path: '', redirectTo: 'logs', pathMatch:'full'},
                    {
                        path: 'logs',
                        loadComponent: () => import('../logs/log/log.component').then((p) => p.LogComponent)
                    }
            ]
        }
]

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})
export class LayoutRoutingModule {}