import { ChangeDetectorRef, Component } from '@angular/core';
// import {ProxyLogsComponentStore} from '../log/logs.store'
import { filter, finalize, Observable, take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { getWalletBalanceLoading, getWalletBalanceSuccess, registerSuccess, selectPaymentUrl, selectUser } from '../../otp/send-otp/store/selectors/otp.selector';
import { select, Store } from '@ngrx/store';
import {  getWalletBalanceAction, rechargeWalletAction } from '../../otp/send-otp/store/actions/otp.action';
import { WalletRechargeDialogComponent } from '../../wallet-recharge-dialog/wallet-recharge-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ServicesProxyLogsService } from '../../services/services-proxy-logs.service';
import { CommonModule } from '@angular/common';
import { NoRecordFoundComponent } from '../../no-record/no-record-found.component';
import { ProxyLogsComponentStore } from './logs.store';
import { LogsDetailsSideDialogComponent } from '../log-details-side-dialog/log-details-side-dialog.component';
import { LoaderButtonDirective } from '../../../libs/loader-button/directives-loader-button.module';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  imports: [
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    NoRecordFoundComponent,
    LoaderButtonDirective,
    MatTooltipModule
  ],
  providers: []
})


export class LogComponent {
  // Reference for the side panel dialog displaying log details
  public logDetailDialogRef!: MatDialogRef<LogsDetailsSideDialogComponent>;

  // Column identifiers used in the logs table
  displayedColumns: string[] = [
          'request_type',
          'user_ip',
          'endpoint',
          'status_code',
          'response_time',
          'created_at'
  ]

  public params: any = {};

    // Observables for wallet balance, recharge, and logs
  public walletBalance$: Observable<number>;
  public rechargeWallet$: Observable<any>;
  public registerUser$: Observable<any>;
  public logs$: Observable<any>;
  public reqLogs$: Observable<any>;

  // Current wallet balance value
  public balance: number = 0;

  // UI-related state flags
  public isrotate: boolean = false;
  public walletBalanceLoading$: Observable<any>
  public isLoading:boolean = false;
 

  constructor(
            private store: Store<any>,
            private dialog: MatDialog,
            private service: ServicesProxyLogsService,
            private componentStore: ProxyLogsComponentStore,
            private cdr: ChangeDetectorRef 
  ) {
      // Subscribing to various pieces of state using selectors
     this.walletBalance$ = this.store.pipe(select(getWalletBalanceSuccess)),
      this.rechargeWallet$ = this.store.pipe(select(selectPaymentUrl)),
      this.registerUser$ = this.store.pipe(select(registerSuccess)),
      this.walletBalanceLoading$ = this.store.pipe(select(getWalletBalanceLoading)),

      // Logs observables from component store
      this.logs$ = this.componentStore.logsData$,
      this.reqLogs$ = this.componentStore.reqLogs$
      
  }

  ngOnInit(): void {
    // Fetch initial logs and wallet balance on component load
    this.getLogs();
    this.getWalletbalance()

     // Get one-time balance value and store it in a local variable
    this.walletBalance$.pipe(take(1)).subscribe(balance => {
      if (balance !== null && balance !== undefined) {
        this.balance = balance;
      }
    });

  }

   /**
   * Dispatches an action to fetch the current wallet balance.
   */
  public getWalletbalance(): void {
    this.store.dispatch(getWalletBalanceAction());
  }

   /**
   * Opens the Wallet Recharge dialog to allow users to add funds.
   */
  public rechargewallet() {
    const dialogRef = this.dialog.open(WalletRechargeDialogComponent, {
      panelClass: ['mat-right-dialog', 'mat-dialog-lg'],
      position: { right: '0px', top: '0px' },
      width: '500px',
      height: '100vh',
      data: {
        appearance: 'legacy',
        hideLabel: true,
      }
    });

    dialogRef.afterClosed().subscribe((res: any) => {

      if (true) {
        // this.getwalletbalance();
      }
    })

  }

  /**
   * Triggers fetching of log records via component store.
   */
  public getLogs() {
    this.componentStore.getLogs({ ...this.params })
  }

  /**
   * Opens the side drawer with detailed log information.
   * @param id Unique log entry ID to fetch and display
   */
  public viewLogsDetail(id:string) {
       this.componentStore.getLogsById(id);
       // Open the log detail dialog with observable data
           const logDetailDialogRef = this.dialog.open(LogsDetailsSideDialogComponent, {
            panelClass: ['mat-right-dialog', 'mat-dialog-lg'],
            data: {
                logData$: this?.reqLogs$,
                isLoading$: this.componentStore?.reqLogsInProcess$,
            },
              autoFocus: false,
              hasBackdrop: false,
              enterAnimationDuration: '0ms',
              exitAnimationDuration: '0ms',
            });
            logDetailDialogRef.afterClosed().subscribe(() => {
                  
            })
       
    }
    
}
