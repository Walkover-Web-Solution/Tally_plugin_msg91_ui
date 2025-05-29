import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MainLeftSideNavComponent } from './main-left-side-nav/main-left-side-nav.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IUserModel } from '../models/root-models';
import { selectUser } from '../otp/send-otp/store/selectors';
import { getUserAction } from '../otp/send-otp/store/actions/otp.action';

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
        RouterOutlet,
        RouterModule
  ]
})
export class LayoutComponent  implements OnInit {
    public showToggle = false;
    public isSideNavOpen = new BehaviorSubject<boolean>(true);
    public logInData$: Observable<any>

    constructor(private store:Store) {
      this.logInData$ = this.store.pipe(select(selectUser))
     
    }
    public log(){ 
       this.store.dispatch(getUserAction())
    }
    ngOnInit(): void {
         this.log();
    }
   

    public toggleSideNav(): void {
        this.isSideNavOpen.next(!this.isSideNavOpen.getValue());
    }
}