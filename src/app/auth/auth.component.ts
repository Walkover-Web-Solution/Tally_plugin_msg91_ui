import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectexistOtpVerified } from '../otp/send-otp/store/selectors/otp.selector';
import { Store } from '@ngrx/store';
import { existOtpVerify, getWalletBalanceAction, sendOtpAction } from '../otp/send-otp/store/actions/otp.action';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
 ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})

export class AuthComponent {
    // public existotpverify$: Observable<any>
    islogin = false;
    isOtpSent = false;
    mobileNumber = ''
    existotpverify$: any;

    constructor(private store:Store, private router:Router) {
        this.existotpverify$ = this.store.select(selectexistOtpVerified)
    }
    
    public loginform = new FormGroup({
          mobileNumber: new FormControl('',[Validators.required]),

          otp: new FormControl('')
    })

    register() {
       this.router.navigate(['/register'])
    }

    otpsend(){
       this.islogin=true;
    }

    sendOtp() {
      const mobileControl = this.loginform.get('mobileNumber');
  
      const mobile = this.loginform.get('mobileNumber')?.value ?? '';
      this.store.dispatch(sendOtpAction({ mobile }));
      this.isOtpSent = true;
    }

    verifyOtp() {
      const mobile = this.loginform.get("mobileNumber")?.value ?? "";
      const otp = this.loginform.get("otp")?.value ?? "";
  
      if (!otp || otp.length !== 4) {
        return;
      }
  
      this.store.dispatch(existOtpVerify({ request: { mobile, otp } }));

      this.existotpverify$.subscribe((res:any)=> {
            if(res) {
                  this.router.navigate(['/layout/logs'])
                  this.store.dispatch(getWalletBalanceAction())
            }
      })
    }
}