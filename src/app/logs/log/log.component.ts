import { Component } from '@angular/core';
import {ProxyLogsComponentStore} from '../log/logs.store'
import { Observable } from 'rxjs';
import { getWalletBalanceSuccess, registerSuccess, selectPaymentUrl } from 'src/app/otp/send-otp/store/selectors';
import { select, Store } from '@ngrx/store';
import { getWalletBalanceAction, rechargeWalletAction } from 'src/app/otp/send-otp/store/actions/otp.action';
import { WalletRechargeDialogComponent } from 'src/app/wallet-recharge-dialog/wallet-recharge-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ServicesProxyLogsService } from 'src/app/services/services-proxy-logs.service';
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
  providers: [ProxyLogsComponentStore]
})
export class LogComponent {

  public displayedColumns: string[] = [
    'created_at',
    'project_name',
    'user_ip',
    'endpoint',
    'request_type',
    'status_code',
    'response_time',
];

  public params: any = {};
  public walletBalance$: Observable<number>
  public rechargeWallet$: Observable<any>
  public logs$: Observable<any> = this.componentStore.logsData$;
  public balance:number = 0;
  public registerUser$: Observable<any>
  isLoading$ = this.componentStore.isLoading$;

  constructor( private componentStore: ProxyLogsComponentStore, private store:Store<any>,
               private dialog:MatDialog, private service: ServicesProxyLogsService
  ) {
      this.walletBalance$ = this.store.pipe(select(getWalletBalanceSuccess)),
      this.rechargeWallet$ = this.store.pipe(select(selectPaymentUrl)),
      this.registerUser$ = this.store.pipe(select(registerSuccess))
  }

  ngOnInit(): void {
    this.getLogs();
    this.getWalletbalance()

    this.walletBalance$.subscribe(balance => {
      if (balance !== null && balance !== undefined) {
        console.log("Wallet Balance from Store:", balance);
        this.balance = balance;
      } else {
        console.warn("Balance is null or undefined, check Store!");
      }
    });

  }

  public getLogs(): void {
    this.componentStore.getLogs({ ...this.params });
  }

  // public getwalletbalance(): void {
  //   this.service.getWalletBalance().subscribe({
  //     next: (balance) => {
  //       console.log("Wallet Balance API Response:", balance);
  //       if (balance !== null && balance !== undefined) {
  //         this.balance = balance;
  //       } else {
  //         console.warn("Balance is null or undefined, check API response!");
  //       }
  //     },
  //     error: (error) => {
  //       console.error("Error fetching wallet balance:", error);
  //     }
  //   });
  // }
  public getWalletbalance(): void{
       this.store.dispatch(getWalletBalanceAction());
  }
  
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

      dialogRef.afterClosed().subscribe((res:any) => {
            
        if(true) {
              // this.getwalletbalance();
        }
      })

  }
}
