import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, takeUntil } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserLeftSideNavComponent } from './user-left-side-nav/user-left-side-nav.component';
import { select, Store } from '@ngrx/store';
import { isEqual } from 'lodash-es';
import { selectUser } from '../otp/send-otp/store/selectors';
import { BaseComponent } from '../../libs/ui/base-component/base.component';
import { getUserAction } from '../otp/send-otp/store/actions/otp.action';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  imports:[
        MatIconModule,
        MatMenuModule,
        CommonModule,
        MatSidenavModule,
        MatTooltipModule,
        MatListModule,
        RouterOutlet,
        UserLeftSideNavComponent
  ]
})
export class UserLayoutComponent extends BaseComponent { 

     // Flag to show/hide sidebar toggle button
    public showToggle = false;

    // BehaviorSubject to track whether the sidebar is open or closed
    public isSideNavOpen = new BehaviorSubject<boolean>(true);

     // Observable to hold logged-in user data from the store
    public logInData$: Observable<any>
    ngOnInit(): void {
        this.loadUserData();
    }

    constructor(private store: Store) 
    {
         super();
         this.logInData$ = this.store.pipe(select(selectUser),distinctUntilChanged(isEqual), takeUntil(this.destroy$))
    }
    
     // Dispatch action to fetch user data from API/store
    public loadUserData() {
        this.store.dispatch(getUserAction())
    }

      // Method to toggle the sidebar open/close state
    public toggleSideNav(): void {
        this.isSideNavOpen.next(!this.isSideNavOpen.getValue());
    }
}