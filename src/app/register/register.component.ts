import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { sendOtpAction, getOtpVerifyAction, registerAction, getWalletBalanceAction } from "../otp/send-otp/store/actions/otp.action";
import { registerSuccess, getWalletBalanceSuccess, selectOtpVerified, selectOtpVerifiedError, selectOtpVerifiedLoading } from "../otp/send-otp/store/selectors";
import { Observable } from "rxjs";
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
  // Flag to track if OTP has been sent to the user
  public otpSent = false;

  // Flag to track if OTP has been verified successfully
  public otpVerified = false;

  // Store user's wallet balance after registration
  public balance: number = 0;

  // Observable tracking whether OTP verification is successful
  public otpVerified$: Observable<any>;

  // Observable tracking OTP verification error states
  public otpNotVerified$: Observable<any>;

  // Observable for successful registration token
  public registerUser$: Observable<any>;

  // Observable for wallet balance data from the store
  public walletbalance$: Observable<any>;

  // Instance of IntlPhoneLib to handle international phone input validation/formatting
  public intlPhone: any;

  // Observable tracking loading state while verifying OTP
  public verifyingloading$: Observable<any>;

  constructor(private store: Store<any>,
              private router: Router) {

    // Selectors from NgRx store to get respective states
    this.otpVerified$ = this.store.pipe(select(selectOtpVerified));
    this.registerUser$ = this.store.pipe(select(registerSuccess));
    this.walletbalance$ = this.store.pipe(select(getWalletBalanceSuccess));
    this.otpNotVerified$ = this.store.pipe(select(selectOtpVerifiedError));
    this.verifyingloading$ = this.store.pipe(select(selectOtpVerifiedLoading));
  }

  ngAfterViewInit() {
    // Delay initialization of international phone input to ensure DOM is ready
    setTimeout(() => {
      this.initIntl();
    }, 100);
  }

  // Reactive form group containing nested 'user' group with form controls and validators
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

  /**
   * Initialize the international phone input plugin
   * Attaches IntlPhoneLib to the mobile input element,
   * handles country codes and validation formatting.
   */
  public initIntl() {
    // Access parent shadow root if present
    const parentDom = document.querySelector('app-root')?.shadowRoot;

    // Get the input element for mobile number
    const input = document?.getElementById('mobile-input-wrapper');

    // Custom CSS for phone input styling
    const customCssStyleURL = 'assets/util/intl-tel-input-custom.css';

    if (input) {
      this.intlPhone = new IntlPhoneLib(input, parentDom, customCssStyleURL, true);
    }
  }

  /**
   * Dispatches action to send OTP to the entered mobile number.
   * Sets otpSent flag to true to reveal OTP input in UI.
   */
  public sendotp() {
    const mobile = this.registrationForm.get("user.mobile")?.value ?? "";

    if (mobile) {
      this.store.dispatch(sendOtpAction({ mobile }));
      this.otpSent = true;
    }
  }

  /**
   * Dispatches action to verify the OTP entered by the user.
   * Validates OTP length before dispatching.
   */
  public verifyOtp() {
    const mobile = this.registrationForm.get("user.mobile")?.value ?? "";
    const otp = this.registrationForm.get("user.otp")?.value ?? "";

    if (!otp || otp.length !== 4) {
      return; // Do not dispatch if OTP is invalid length
    }

    this.store.dispatch(getOtpVerifyAction({ request: { mobile, otp } }));
  }

  /**
   * Submits the registration form data by dispatching registerAction.
   * Upon successful registration, navigates to logs page and fetches wallet balance.
   * Also subscribes to wallet balance observable to update the balance shown in UI.
   */
  public submit() {
    const name = this.registrationForm.get("user.fname")?.value ?? "";
    const email = this.registrationForm.get("user.email")?.value ?? "";
    const mobile = this.registrationForm.get("user.mobile")?.value ?? "";

    this.store.dispatch(registerAction({ name, email, mobile }));

    // Listen for registration success token and navigate accordingly
    this.registerUser$.subscribe((token) => {
      if (token) {
        this.router.navigate(['/layout/logs']);
        this.store.dispatch(getWalletBalanceAction());
      }
    });

    // Subscribe to wallet balance updates and save locally
    this.walletbalance$.subscribe((res) => {
      if (res && res.balance) {
        this.balance = res.balance;
      }
    });
  }

  /**
   * Navigate back to the login page.
   */
  public login() {
    this.router.navigate(['/login']);
  }
}
