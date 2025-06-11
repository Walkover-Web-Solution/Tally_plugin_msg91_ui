import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectexistOtpVerified, selectexistOtpVerifiedLoading, selectOtpResponse } from '../otp/send-otp/store/selectors/otp.selector';
import { select, Store } from '@ngrx/store';
import { existOtpVerify, getWalletBalanceAction, sendOtpAction, sendOtpSuccess } from '../otp/send-otp/store/actions/otp.action';
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
import { distinctUntilChanged, Observable, takeUntil } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { SnackBarService } from '../../libs/ui/snack-bar.service';
import { isEqual } from 'lodash-es';
import { BaseComponent } from '../../libs/ui/base-component/base.component';

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
    ToastModule,
 ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})

export class AuthComponent extends BaseComponent {
   public islogin = false;
   public isOtpSent = false;                   
   public mobileNumber = ''                    // Stores the user's entered mobile number
   public existotpverify$: Observable<any>;  // Observable for OTP verification result
   public otpLoading$: Observable<any>;      // Observable for loading state during OTP verification
   public sendOtpSuccess$: any;              // Observable to track OTP send success response
   public mobilefield: boolean = true;        // Flag to toggle between mobile number input and OTP input
   public intlPhone: any;                     // Instance of intl-tel-input wrapper class
  //  @ViewChild('mobileInput', { static: false }) mobileInputRef!: ElementRef;
   
    constructor(private store:Store,
                private router:Router
               ) {
         super();  // Calls BaseComponent to setup destroy$ observable     
        this.existotpverify$ = this.store.pipe(select(selectexistOtpVerified),distinctUntilChanged(isEqual),takeUntil(this.destroy$))        // Subscribes to OTP verification result from NgRx store 
        this.sendOtpSuccess$ = this.store.pipe(select(selectOtpResponse),distinctUntilChanged(isEqual),takeUntil(this.destroy$))           // Subscribes to OTP send success data
        this.otpLoading$ = this.store.pipe(select(selectexistOtpVerifiedLoading),distinctUntilChanged(isEqual),takeUntil(this.destroy$))    // Subscribes to OTP loading state
    }

    ngAfterViewInit(): void {
       // Initialize intl-tel-input only if mobile input is shown
          if (this.mobilefield) {
              setTimeout(() => {
                this.initIntlPhone();
              });
          }   
    }

      /**
    * Initializes the intl-tel-input plugin on the mobile input field
    * Adds country flag, dial code, and formatting
    */
    initIntlPhone() {
      const parentDom = document.querySelector('app-root')?.shadowRoot;
      const input = document?.getElementById('mobile-input-wrapper');
      const customCssStyleURL = 'assets/util/intl-tel-input-custom.css';
    
      if (input) {
        this.intlPhone = new IntlPhoneLib(input,parentDom,customCssStyleURL, true,                                        
        );
      }
    }
    
     /**
    * Reactive form with mobileNumber and OTP controls
    */
    public loginform = new FormGroup({
          mobileNumber: new FormControl('',[Validators.required,Validators.pattern(PHONE_NUMBER_REGEX)]),
          otp: new FormControl('',[Validators.pattern(PHONE_NUMBER_REGEX)])
    })

     /**
    * Redirects the user to the registration page
    */
    public register() {
       this.router.navigate(['/register'])
    }

    /**
     * Dispatches send Otp action 
     * Sends OTP to the entered mobile number  */ 
    public sendOtp() {
      const mobileNumber = this.intlPhone?.phoneNumber || '';
      const mobile = mobileNumber.startsWith('+') ? mobileNumber.slice(1) : mobileNumber;
      if(!mobile && mobile.length==12) return;
      this.store.dispatch(sendOtpAction({ mobile }));
      this.isOtpSent = true;
      this.mobilefield = false;
       
    }
      /**
    * Verifies the entered OTP with the backend
    * On success, navigates to logs layout and triggers wallet balance fetch
    */
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

     /**
    * Switches UI back to mobile input view and re-initializes intl-tel-input
    */
   public backtoMobile() {
         this.isOtpSent = false;
         this.mobilefield = true;

         setTimeout(() => {     
            this.initIntlPhone();
        }, 100);
  }

}