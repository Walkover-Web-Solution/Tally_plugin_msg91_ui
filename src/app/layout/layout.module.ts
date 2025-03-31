import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MainLeftSideNavComponent } from "./main-left-side-nav/main-left-side-nav.component";
import { LayoutComponent } from "./layout.component";
import { LayoutRoutingModule } from "./layout-routing.module";
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';

@NgModule({
    declarations: [ LayoutComponent, MainLeftSideNavComponent],
    imports : [
        LayoutRoutingModule,
        MatIconModule,
        MatMenuModule,
        CommonModule,
        MatSidenavModule,
        MatTooltipModule,
        MatListModule
    ]
})
export class LayoutModule {}