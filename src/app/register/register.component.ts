import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { sendOtpAction, getOtpVerifyAction, registerAction, getWalletBalanceAction, getOtpVerifyActionComplete } from "../otp/store/actions/otp.actions";
import { registerSuccess, getWalletBalanceSuccess, selectOtpVerified, selectOtpVerifiedError } from "../otp/store/selectors";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
// import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  imports:[
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  public otpSent = false;
  public otpVerified = false;
  public balance:number = 0;
  public otpVerified$: Observable<any>;
  public otpNotVerified$: Observable<any>;
  registerUser$: Observable<any>;
  walletbalance$: Observable<any>;

  constructor(private store: Store<any>,
              private router: Router,
  ) {
    this.otpVerified$ = this.store.pipe(select(selectOtpVerified));
    this.registerUser$ = this.store.pipe(select(registerSuccess));
    this.walletbalance$ = this.store.pipe(select(getWalletBalanceSuccess));
    this.otpNotVerified$ = this.store.pipe(select(selectOtpVerifiedError))
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

  public sendotp() {
    const mobile = this.registrationForm.get("user.mobile")?.value ?? "";
    
    if(mobile){
        this.store.dispatch(sendOtpAction({ mobile }));
        this.otpSent = true;
        // this.toastr.info("OTP Sent!", "Info");
    }
    console.log("OTP Sent!");
  }

  public  verifyOtp() {
    const mobile = this.registrationForm.get("user.mobile")?.value ?? "";
    const otp = this.registrationForm.get("user.otp")?.value ?? "";

    if (!otp || otp.length !== 4) {
      return;
    }

    this.store.dispatch(getOtpVerifyAction({ request: { mobile, otp } }));
    this.store.dispatch(getOtpVerifyActionComplete({ response: { success: true } }));

    this.otpVerified$.subscribe((res)=> {
      console.log("response",res)
})

  }

  public submit() {
    console.log("hello")
    const name = this.registrationForm.get("user.fname")?.value ?? "";
    const email = this.registrationForm.get("user.email")?.value ?? "";
    const mobile = this.registrationForm.get("user.mobile")?.value ?? "";

    // if(!name || !email || !mobile) {
    //     //toast show krana h 
    //     return;
    // }
    this.store.dispatch(registerAction({name,email,mobile}));

    this.registerUser$.subscribe((token) => {
        if(token) {
            this.router.navigate(['/app/logs'])
            this.store.dispatch(getWalletBalanceAction())

        }
    })
    this.walletbalance$.subscribe((res) => {
        if(res && res.balance) {
             this.balance = res.balance;
        }
    })
  }
 

}
