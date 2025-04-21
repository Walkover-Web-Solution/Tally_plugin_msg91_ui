import { Component } from '@angular/core';
import { rechargeWalletAction, rechargeWalletSuccess } from '../otp/send-otp/store/actions/otp.action';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { registerSuccess, selectPaymentUrl, selectWalletError, selectWalletLoading } from '../otp/send-otp/store/selectors';
import { ServicesProxyLogsService } from '../services/services-proxy-logs.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

declare var Razorpay: any;

@Component({
  selector: 'app-wallet-recharge-dialog',
  templateUrl: './wallet-recharge-dialog.component.html',
  imports: [
       ReactiveFormsModule,
       MatInputModule,
       MatFormFieldModule,
       ReactiveFormsModule,
       MatInputModule,
       MatIconModule
  ],
  styleUrls: ['./wallet-recharge-dialog.component.css']
})
export class WalletRechargeDialogComponent {

  paymentUrl$: Observable<any>
  loading$: Observable<boolean>;
  error$: Observable<any>;
  paymentUrl: string = ''
  showPaymentPopup: boolean = false;
  constructor(private store:Store,  private service: ServicesProxyLogsService){
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


//   public extractOrderId(url: string): string {
//     const match = url.match(/order_id=([^&]*)/);
//     return match ? match[1] : "";
//   }

//   public handlePaymentSuccess(response: any) {
//     console.log("Payment Successful:", response);
//     this.store.dispatch(rechargeWalletAction({
//         token: response.razorpay_payment_id,
//         amount: this.walletForm.get('amount')?.value
//     }));
// }

//   public openRazorpay(paymentUrl: string) {
//        const options = {
//             description: "Wallet Recharge",
//             order_id: this.extractOrderId(paymentUrl),
//             handler: (response:any) => {
//                   this.handlePaymentSuccess(response)
//             }
//        };

//        const razorpay = new Razorpay(options)
//        razorpay.open();
//   }

//   public loadRazorpayScript() {
//     if (document.getElementById('razorpay-script')) {
//         return; // Prevents loading the script multiple times
//     }

//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.id = 'razorpay-script';
//     script.onload = () => {
//         console.log("Razorpay script loaded successfully.");
//     };
//     script.onerror = () => {
//         console.error("Failed to load Razorpay script.");
//     };

//     document.body.appendChild(script);
// }

} 
