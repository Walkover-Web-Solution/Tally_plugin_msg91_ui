import { Component } from '@angular/core';
// import {ProxyLogsComponentStore} from '../log/logs.store'
import { Observable } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { getWalletBalanceSuccess, registerSuccess, selectPaymentUrl } from '../../otp/send-otp/store/selectors/otp.selector';
import { select, Store } from '@ngrx/store';
import { getWalletBalanceAction, rechargeWalletAction } from '../../otp/send-otp/store/actions/otp.action';
import { WalletRechargeDialogComponent } from '../../wallet-recharge-dialog/wallet-recharge-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ServicesProxyLogsService } from '../../services/services-proxy-logs.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
  imports: [
      MatButtonModule,
      MatTableModule,
      MatCardModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule
  ],
  providers: []
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
  public balance:number = 0;
  public registerUser$: Observable<any>

  constructor(private store:Store<any>,
               private dialog:MatDialog, private service: ServicesProxyLogsService
  ) {
      this.walletBalance$ = this.store.pipe(select(getWalletBalanceSuccess)),
      this.rechargeWallet$ = this.store.pipe(select(selectPaymentUrl)),
      this.registerUser$ = this.store.pipe(select(registerSuccess))
  }

  ngOnInit(): void {
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
