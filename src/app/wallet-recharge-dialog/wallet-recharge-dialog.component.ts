import { Component, Inject } from '@angular/core';
import { rechargeWalletAction, rechargeWalletSuccess } from '../otp/send-otp/store/actions/otp.action';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { registerSuccess, selectPaymentUrl, selectWalletError, selectWalletLoading } from '../otp/send-otp/store/selectors';
import { ServicesProxyLogsService } from '../services/services-proxy-logs.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
// import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-wallet-recharge-dialog',
  templateUrl: './wallet-recharge-dialog.component.html',
  standalone: true,
  imports: [
       ReactiveFormsModule,
       MatInputModule,
       MatFormFieldModule,
       ReactiveFormsModule,
       MatInputModule,
       MatIconModule,
       MatDividerModule,
      //  MatButtonModule
  ],
  providers: [],
  styleUrls: ['./wallet-recharge-dialog.component.scss']
})
export class WalletRechargeDialogComponent {

  paymentUrl$: Observable<any>
  loading$: Observable<boolean>;
  error$: Observable<any>;
  paymentUrl: string = ''
  showPaymentPopup: boolean = false;
  constructor(private store:Store,  private service: ServicesProxyLogsService,
              private dialogRef: MatDialogRef<WalletRechargeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any 
  ){
    this.paymentUrl$ = this.store.select(selectPaymentUrl);
    this.loading$ = this.store.select(selectWalletLoading);
    this.error$ = this.store.select(selectWalletError);
  }


  public walletForm = new FormGroup({
           amount: new FormControl<string>("")
  })

  ngOnInit() {
      
  }

  public add(){
      if(this.walletForm.valid) {
            const amount = this.walletForm.get('amount')?.value ?? "";
             
            const token = this.service.rechargeWallet(amount);

            this.store.dispatch(rechargeWalletAction({token, amount}));

            this.paymentUrl$.subscribe((url)=> {
                  if(url) {
                    const callbackUrl = encodeURIComponent(window.location.origin + "/app/logs");
                    const finalUrl = `${url}?redirect=${callbackUrl}`;
    
                    window.location.href = finalUrl;
                  }
          })
      }
  }

  public closeDialog() {
      this.dialogRef.close();
  }


} 
