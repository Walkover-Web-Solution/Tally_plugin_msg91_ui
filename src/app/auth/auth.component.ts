import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
import { PHONE_NUMBER_REGEX } from '../regex';
import { IntlPhoneLib } from '../../libs/intl-phone-lib.class';

@Component({
  selector: 'app-auth',
  standalone:true, 
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
   public islogin = false;
   public isOtpSent = false;
   public mobileNumber = ''
   public existotpverify$: any;
   public mobilefield: boolean = true;
   public intlPhone: any;


  //  @ViewChild('mobileInput', { static: false }) mobileInputRef!: ElementRef;
   
    constructor(private store:Store, private router:Router) {
        this.existotpverify$ = this.store.select(selectexistOtpVerified)
    }

    ngAfterViewInit(): void {
          if (this.mobilefield) {
              setTimeout(() => {
                this.initIntlPhone();
              });
          }   
    }

    initIntlPhone() {
      const parentDom = document.querySelector('app-root')?.shadowRoot;
      const input = document?.getElementById('mobile-input-wrapper');
      const customCssStyleURL = 'assets/util/intl-tel-input-custom.css';
    
      if (input) {
        this.intlPhone = new IntlPhoneLib(input,parentDom,customCssStyleURL, true,                                        
        );
      }
    }
    
    public loginform = new FormGroup({
          mobileNumber: new FormControl('',[Validators.required,Validators.pattern(PHONE_NUMBER_REGEX)]),
          otp: new FormControl('')
    })

    public register() {
       this.router.navigate(['/register'])
    }

    public otpsend() {
       this.islogin=true;
    }


    public sendOtp() {
      const mobileNumber = this.intlPhone?.phoneNumber || '';
      const mobile = mobileNumber.startsWith('+') ? mobileNumber.slice(1) : mobileNumber;
      if(!mobile && mobile.length==12) return;
      this.store.dispatch(sendOtpAction({ mobile }));
      this.isOtpSent = true;
      this.mobilefield = false;
    }

    public verifyOtp() {
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

   public backtoMobile() {
         this.isOtpSent = false;
         this.mobilefield = true;

         setTimeout(() => {     
            this.initIntlPhone();
        }, 100);
  }
  
}