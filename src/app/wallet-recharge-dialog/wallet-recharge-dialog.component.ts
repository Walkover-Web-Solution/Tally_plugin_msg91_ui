import { Component, Inject } from '@angular/core';
import { rechargeWalletAction } from '../otp/send-otp/store/actions/otp.action';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { selectPaymentUrl, selectWalletError, selectWalletLoading } from '../otp/send-otp/store/selectors';
import { ServicesProxyLogsService } from '../services/services-proxy-logs.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-wallet-recharge-dialog',
  templateUrl: './wallet-recharge-dialog.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  styleUrls: ['./wallet-recharge-dialog.component.scss']
})
export class WalletRechargeDialogComponent {

  // Observables for state management
  paymentUrl$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  // Local state variables
  paymentUrl: string = '';
  showPaymentPopup: boolean = false;

  constructor(
    private store: Store,
    private service: ServicesProxyLogsService,
    private dialogRef: MatDialogRef<WalletRechargeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Selectors to listen for state changes
    this.paymentUrl$ = this.store.select(selectPaymentUrl);
    this.loading$ = this.store.select(selectWalletLoading);
    this.error$ = this.store.select(selectWalletError);
  }

  // Reactive form for capturing recharge amount
  public walletForm = new FormGroup({
    amount: new FormControl<string>("")
  });

  // Method to handle recharge action
  public add() {
    if (this.walletForm.valid) {
      const amount = this.walletForm.get('amount')?.value ?? "";

      // Get the token (probably encrypted or authorized) from service
      const token = this.service.rechargeWallet(amount);

      // Dispatch NgRx action to initiate recharge process
      this.store.dispatch(rechargeWalletAction({ token, amount }));

      // Subscribe to paymentUrl$ to redirect when URL becomes available
      this.paymentUrl$.subscribe((url) => {
        if (url) {
          const callbackUrl = encodeURIComponent(window.location.origin + "/app/logs");
          // Construct final redirect URL
          const finalUrl = `${url}?redirect=${callbackUrl}`;
          // Redirect to payment gateway
          window.location.href = finalUrl;
        }
      });
    }
  }

  // Method to close the dialog
  public closeDialog() {
    this.dialogRef.close();
  }

}
