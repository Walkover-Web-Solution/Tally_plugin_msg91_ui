import { inject, Injectable } from "@angular/core";
import { otpActions } from "../actions/index";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import {Actions, createEffect, ofType} from '@ngrx/effects'
import { ServicesProxyLogsService } from "../../../../services/services-proxy-logs.service";
import { getWalletBalanceAction, getWalletBalanceFailure, getWalletBalanceSuccess, rechargeWalletAction, rechargeWalletError, rechargeWalletSuccess, registerAction, registerFailure, registerSuccess } from "../actions/otp.action";



@Injectable()
export class OtpEffects {
     constructor( ) {}

     actions$ = inject(Actions)
     service: ServicesProxyLogsService = inject(ServicesProxyLogsService)
    
    sendOtp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(otpActions.sendOtpAction),
            switchMap(({ mobile }) => {
                console.log("Effect triggered: sendOtpAction", mobile);
                return this.service.sendOtp(mobile).pipe(
                    map((response) => {
                        console.log("Effect received API response:", response);
                        return otpActions.sendOtpSuccess({ response });
                    }),
                    catchError((error) => {
                        console.error("Effect error: sendOtpFailure", error);
                        return of(otpActions.sendOtpFailure({ error }));
                    })
                );
            })
        )
    );
    
    // verifyOtp$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(otpActions.getOtpVerifyAction),
    //     switchMap(({ request }) =>
    //       this.otpService.verfiyOtp(request.mobile, request.otp).pipe(
    //         map((res: any) => {
    //           console.log("OTP API Response:", res); // Check API response here
    //           if (res.type === 'success') {
    //             console.log("Dispatching getOtpVerifyActionComplete");
    //             return otpActions.getOtpVerifyActionComplete({ response: res });
    //           }
    //           return otpActions.getOtpVerifyActionError({
    //             errors: [res.message],
    //             errorResponse: res,
    //           });
    //         }),
    //         catchError((err) => {
    //           console.error("OTP Verification Error:", err);
    //           return of(
    //             otpActions.getOtpVerifyActionError({
    //               errors: [err.message || 'Something went wrong'],
    //               errorResponse: err,
    //             })
    //           );
    //         })
    //       )
    //     )
    //   )
    // );

    verifyOtp$ = createEffect(() =>
  this.actions$.pipe(
    ofType(otpActions.getOtpVerifyAction),
    switchMap(({ request }) =>
      this.service.verfiyOtp(request.mobile, request.otp).pipe(
        map((res: any) => {
          console.log("OTP API Response:", res); // Log API response

          if (res.status === 'success' && !res.hasError) {
            console.log("Dispatching getOtpVerifyActionComplete");
            return otpActions.getOtpVerifyActionComplete({ response: res });
          }

          return otpActions.getOtpVerifyActionError({
            errors: res.errors.length ? res.errors : ['OTP verification failed'],
            errorResponse: res,
          });
        }),
        catchError((err) => {
          console.error("OTP Verification Error:", err);
          return of(
            otpActions.getOtpVerifyActionError({
              errors: [err.message || 'Something went wrong'],
              errorResponse: err,
            })
          );
        })
      )
    )
  )
);

existinguser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(otpActions.existOtpVerify),
    switchMap(({ request }) =>
      this.service.existinguser(request.mobile, request.otp).pipe(
        map((res: any) => {
          console.log("OTP API Response:", res); // Log API response

          if (res.status === 'success' && !res.hasError) {
            console.log("Dispatching getOtpVerifyActionComplete");
            return otpActions.existOtpVerifyActionComplete({ response: res });
          }

          return otpActions.existOtpVerifyActionError({
            errors: res.errors.length ? res.errors : ['OTP verification failed'],
            errorResponse: res,
          });
        }),
        catchError((err) => {
          console.error("OTP Verification Error:", err);
          return of(
            otpActions.existOtpVerifyActionError({
              errors: [err.message || 'Something went wrong'],
              errorResponse: err,
            })
          );
        })
      )
    )
  )
);
  
    register$ = createEffect(() =>
        this.actions$.pipe(
          ofType(registerAction),
          mergeMap((action) =>
            this.service.registerUser(action.name, action.email, action.mobile).pipe(
              map((response) => {
                const token = response.data.proxy_auth_token;
                return registerSuccess({token});
              }),
              catchError((error) => of(registerFailure({ error })))
            )
          )
        )
      );

      getWalletBalance$ = createEffect(() =>
        this.actions$.pipe(
          ofType(getWalletBalanceAction),
          switchMap((action) =>
            this.service.getWalletBalance().pipe(
              map((balance) => getWalletBalanceSuccess({ balance })),
              catchError((error) => of(getWalletBalanceFailure({ error })))
            )
          )
        )
      );

      rechargeWallet$ = createEffect(() =>
        this.actions$.pipe(
          ofType(rechargeWalletAction),
          switchMap((action) =>
            this.service.rechargeWallet(action.amount).pipe(
              map((response) => {
                if (response.data?.['Payment URL']) {
                  return rechargeWalletSuccess({ paymentUrl: response.data['Payment URL'] });
                } else {
                  return rechargeWalletError({ error: 'Invalid response' });
                }
              }),
              catchError((error) => of(rechargeWalletError({ error })))
            )
          )
        )
      );
      
      
}


