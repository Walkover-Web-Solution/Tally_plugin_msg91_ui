import { Component, Input } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-user-left-side-nav',
  templateUrl: './user-left-side-nav.component.html',
  imports:[
      MatIconModule,
      MatTooltipModule,
      RouterModule,
      MatListModule,
      MatSidenavModule
  ],
  styleUrls: ['./user-left-side-nav.component.scss']
})
export class UserLeftSideNavComponent{
     @Input() public isSideNavOpen!: boolean;
}