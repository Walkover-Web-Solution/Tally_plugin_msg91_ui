import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MainLeftSideNavComponent } from './main-left-side-nav/main-left-side-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports:[
        MatIconModule,
        MatMenuModule,
        CommonModule,
        MatSidenavModule,
        MatTooltipModule,
        MatListModule,
        MainLeftSideNavComponent,
        RouterOutlet
  ]
})
export class LayoutComponent extends Component implements OnInit {
    public showToggle = false;
    public isSideNavOpen = new BehaviorSubject<boolean>(true);
  
    ngOnInit(): void {

    }

    public toggleSideNav(): void {
        this.isSideNavOpen.next(!this.isSideNavOpen.getValue());
    }
}