import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { sendOtpAction, getOtpVerifyAction, registerAction, getWalletBalanceAction, getOtpVerifyActionComplete } from "../otp/send-otp/store/actions/otp.action";
import { registerSuccess, getWalletBalanceSuccess, selectOtpVerified, selectOtpVerifiedError, selectOtpVerifiedLoading } from "../otp/send-otp/store/selectors";
import { Observable, take } from "rxjs";
import { Router } from "@angular/router";
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { IntlPhoneLib } from "../../libs/intl-phone-lib.class";
import { LoaderButtonDirective } from "../../libs/loader-button/directives-loader-button.module";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    LoaderButtonDirective,
    MatIconModule
  ]
})
export class RegisterComponent {
  public otpSent = false;
  public otpVerified = false;
  public balance: number = 0;
  public otpVerified$: Observable<any>;
  public otpNotVerified$: Observable<any>;
  public registerUser$: Observable<any>;
  public walletbalance$: Observable<any>;
  public intlPhone: any;
  public verifyingloading$: Observable<any>;

  constructor(private store: Store<any>,
    private router: Router,

  ) {
    this.otpVerified$ = this.store.pipe(select(selectOtpVerified));
    this.registerUser$ = this.store.pipe(select(registerSuccess));
    this.walletbalance$ = this.store.pipe(select(getWalletBalanceSuccess));
    this.otpNotVerified$ = this.store.pipe(select(selectOtpVerifiedError))
    this.verifyingloading$ = this.store.pipe(select(selectOtpVerifiedLoading))
  }
  
    ngAfterViewInit() {
      setTimeout(() => {
        this.initIntl();
      }, 100);
    }
    
  public registrationForm = new FormGroup({
    user: new FormGroup({
      fname: new FormControl<string>("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(24),
      ]),

      lname: new FormControl<string>("", [
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),

      email: new FormControl<string>("", [
        Validators.required
      ]),
      mobile: new FormControl<string>("", [Validators.required]),
      otp: new FormControl<string>("", [
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
    }),
  });


  public initIntl() {
    const parentDom = document.querySelector('app-root')?.shadowRoot;
    const input = document?.getElementById('mobile-input-wrapper');
    const customCssStyleURL = 'assets/util/intl-tel-input-custom.css';

    if (input) {
      this.intlPhone = new IntlPhoneLib(input, parentDom, customCssStyleURL, true,
      );
    }
  }

  public sendotp() {
    const mobile = this.registrationForm.get("user.mobile")?.value ?? "";

    if (mobile) {
      this.store.dispatch(sendOtpAction({ mobile }));
      this.otpSent = true;
    }
  }

  public verifyOtp() {
   
    const mobile = this.registrationForm.get("user.mobile")?.value ?? "";
    const otp = this.registrationForm.get("user.otp")?.value ?? "";

    if (!otp || otp.length !== 4) {
      return;
    }

    this.store.dispatch(getOtpVerifyAction({ request: { mobile, otp } }));

  }

  public submit() {
    const name = this.registrationForm.get("user.fname")?.value ?? "";
    const email = this.registrationForm.get("user.email")?.value ?? "";
    const mobile = this.registrationForm.get("user.mobile")?.value ?? "";

    this.store.dispatch(registerAction({ name, email, mobile }));

    this.registerUser$.subscribe((token) => {
      if (token) {
        this.router.navigate(['/layout/logs'])
        this.store.dispatch(getWalletBalanceAction())

      }
    })
    this.walletbalance$.subscribe((res) => {
      if (res && res.balance) {
        this.balance = res.balance;
      }
    })
  }

  public login() {
     this.router.navigate(['/login'])
  }


}
