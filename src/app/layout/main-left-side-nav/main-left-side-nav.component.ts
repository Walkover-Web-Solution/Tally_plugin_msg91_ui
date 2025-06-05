import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-left-side-nav',
  templateUrl: './main-left-side-nav.component.html',
  imports:[
    MatSidenavModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  ],
  styleUrls: ['./main-left-side-nav.component.scss']
})
export class MainLeftSideNavComponent{
  // Input property to determine whether the sidebar is expanded or collapsed.
  // Used to dynamically show/hide menu labels or tooltips.
  @Input() public isSideNavOpen!: boolean;
}