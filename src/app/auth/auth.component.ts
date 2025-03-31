import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { existOtpVerify, existOtpVerifyActionComplete, getOtpVerifyAction, getWalletBalanceAction, sendOtpAction } from '../otp/send-otp/store/actions/otp.action';
import { selectexistOtpVerified } from '../otp/send-otp/store/selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    public existotpverify$: Observable<any>
    islogin = false;
    isOtpSent = false;
    mobileNumber = ''

    constructor(private store:Store, private router:Router) {
        this.existotpverify$ = this.store.select(selectexistOtpVerified)
    }
    
    public loginform = new FormGroup({
          mobileNumber: new FormControl('',[Validators.required]),

          otp: new FormControl('')
    })

    otpsend(){
       this.islogin=true;
    }

    sendOtp() {
        const mobile = this.loginform.get('mobileNumber')?.value ?? ''
        this.store.dispatch(sendOtpAction({mobile}));
        this.isOtpSent = true;
    }

    verifyOtp() {
      const mobile = this.loginform.get("mobileNumber")?.value ?? "";
      const otp = this.loginform.get("otp")?.value ?? "";
  
      if (!otp || otp.length !== 4) {
        return;
      }
  
      this.store.dispatch(existOtpVerify({ request: { mobile, otp } }));

      this.existotpverify$.subscribe((res)=> {
            console.log({res})
            if(res) {
                  this.router.navigate(['/app/logs'])
                  this.store.dispatch(getWalletBalanceAction())
            }
      })
    }
}
