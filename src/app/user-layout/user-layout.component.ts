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
    public showToggle = false;
    public isSideNavOpen = new BehaviorSubject<boolean>(true);
    public logInData$: Observable<any>
    ngOnInit(): void {
        this.name();
    }

    constructor(private store: Store) 
    {
         super();
         this.logInData$ = this.store.pipe(select(selectUser),distinctUntilChanged(isEqual), takeUntil(this.destroy$))
    }
    
    public name() {
        this.store.dispatch(getUserAction())
    }
    public toggleSideNav(): void {
        this.isSideNavOpen.next(!this.isSideNavOpen.getValue());
    }
}