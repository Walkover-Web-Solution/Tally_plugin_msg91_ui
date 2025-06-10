import { inject, Injectable } from "@angular/core";
import { otpActions } from "../actions/index";
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";
import {Actions, createEffect, ofType} from '@ngrx/effects'
import { ServicesProxyLogsService } from "../../../../services/services-proxy-logs.service";
import { getAllFlow, getAllFlowFailure, getAllFlowSuccess, getCampaignFields, getCampaignFieldsFailure, getCampaignFieldsSuccess, getUserAction, getUserFailure, getUserSuccess, getWalletBalanceAction, getWalletBalanceFailure, getWalletBalanceSuccess, rechargeWalletAction, rechargeWalletError, rechargeWalletSuccess, registerAction, registerFailure, registerSuccess } from "../actions/otp.action";
import { BaseResponse } from "../../../../models/root-models";
import { SnackBarService } from "../../../../../libs/ui/snack-bar.service";


@Injectable()
export class OtpEffects {
     constructor(  private _snackBarService: SnackBarService ) {}

     actions$ = inject(Actions)       
     service: ServicesProxyLogsService = inject(ServicesProxyLogsService)   // method to inject the service
    
      /**
   * Effect: Send OTP
   * Triggered when user initiates OTP request via phone.
   * Shows success/error toast based on response.
   */
     sendOtp$ = createEffect(() =>
      this.actions$.pipe(
        ofType(otpActions.sendOtpAction),
        switchMap(({ mobile }) =>
          this.service.sendOtp(mobile).pipe(
            map((response) => {
              if (response.status === 'success' && !response.hasError) {
                // Show success message
                this._snackBarService.openSnackBar('OTP sent successfully', 'success',2, '✖', 'bottom', 'start');
              } else {
                // Show error message
                this._snackBarService.openSnackBar(response.errors?.[0] || 'Failed to send OTP', 'error',4, '✖', 'bottom', 'start');
              } 
              return otpActions.sendOtpSuccess({ response });
            }),
            catchError((error) => {
              return of(otpActions.sendOtpFailure({ error }));
            })
          )
        )
      )
    );
    

   /**
   * Effect: Verify OTP
   * Called after user inputs OTP.
   * On success: dispatch complete action.
   * On failure: returns error messages or defaults.
   */
    verifyOtp$ = createEffect(() =>
      this.actions$.pipe(
    ofType(otpActions.getOtpVerifyAction),
    switchMap(({ request }) =>
      this.service.verfiyOtp(request.mobile, request.otp).pipe(
        map((res: any) => {
          if (res.status === 'success' && !res.hasError) {
            // Show success message
            this._snackBarService.openSnackBar('OTP verified successfully', 'success', 2, '✖', 'bottom', 'start');

            return otpActions.getOtpVerifyActionComplete({ response: res });    
          }
          // Show error message
          this._snackBarService.openSnackBar(res.errors?.[0] || 'OTP verification failed', 'error', 4, '✖', 'bottom', 'start');
          return otpActions.getOtpVerifyActionError({
            errors: res.errors.length ? res.errors : ['OTP verification failed'],
            errorResponse: res,
          });
        }),
        catchError((err) => {
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

  /**
   * Effect: Verify OTP for Existing User
   * Similar to regular OTP verification, used for alternate auth flow.
   */

  existinguser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otpActions.existOtpVerify),
      switchMap(({ request }) =>
        this.service.existinguser(request.mobile, request.otp).pipe(
          map((res: any) => {
            if (res.status === 'success' && !res.hasError) {
              // Show success message
              this._snackBarService.openSnackBar('OTP verified successfully', 'success', 3, '✖', 'bottom', 'start');
              return otpActions.existOtpVerifyActionComplete({ response: res });
            } else{
              // Show error message
              this._snackBarService.openSnackBar(res.errors?.[0] || 'OTP verification failed', 'error', 4, '✖', 'bottom', 'start');    
            }

            return otpActions.existOtpVerifyActionError({
              errors: res.errors.length ? res.errors : ['OTP verification failed'],
              errorResponse: res,
            });
          }),
          catchError((err) => {
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
   
  /**
   * Effect: Register User
   * Sends registration request with user details.
   * On success, extracts and returns auth token.
   */
  
    register$ = createEffect(() =>
        this.actions$.pipe(
          ofType(registerAction),
          mergeMap((action) =>
            this.service.registerUser(action.name, action.email, action.mobile).pipe(
              map((response) => {
                const token = response.data.proxy_auth_token;
                if(response.status === 'success'  && !response.hasError) {
                  this._snackBarService.openSnackBar('Registration successful', 'success', 2, '✖', 'bottom', 'start');
                } else {
                  this._snackBarService.openSnackBar(response.errors?.[0] || 'Registration failed', 'error', 4, '✖', 'bottom', 'start');
                }
                return registerSuccess({token});
              }),
              catchError((error) => of(registerFailure({ error })))
            )
          )
        )
      );

    /**
     * Effect: Get Wallet Balance
     * Fetches the current balance of the user’s wallet.
     */

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

   /**
   * Effect: Recharge Wallet
   * Initiates a recharge and returns payment URL if successful.
   */
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

  /**
   * Effect: Get Logged-in User
   * Retrieves user data after successful login or session restore.
   */
      getUser$ = createEffect(() =>
        this.actions$.pipe(
          ofType(getUserAction),
          switchMap(() =>
            this.service.getUserDetailsData().pipe(
              map((response) => {
                
                const userData = response?.data?.[0] ?? null;
      
                return getUserSuccess({ data: userData });
              }),
              catchError((error) => {
                return of(getUserFailure({ error }));
              })
            )
          )
        )
      );
      

   /**
   * Effect: Get All Campaign Flows
   * Loads campaign list with pagination, using auth key for access control.
   */
      getCampaign$ = createEffect(() =>
          this.actions$.pipe(
            ofType(getAllFlow),
            switchMap(({ param, authkey }) =>
              this.service.getAllCampaignFlowFromApi( param, authkey ).pipe(
                map((flow: BaseResponse<any, void>) => {
                  this._snackBarService.openSnackBar('Auth key verified successfully', 'success', 2, '✖', 'bottom', 'start');
                  return getAllFlowSuccess({
                      campaigns: flow.data.data,
                      pagination: {
                          itemsPerPage: Number(flow.data.itemsPerPage),
                          pageNo: flow.data.pageNo,
                          totalEntityCount: flow.data.totalEntityCount,
                          totalPageCount: flow.data.totalPageCount,
                      },
                  });
              }),
                catchError((error) => {
                  this._snackBarService.openSnackBar('Authkey verification failed', 'error', 4, '✖', 'bottom', 'start');
                  return of(getAllFlowFailure({ error }));
                })
              )
            )
        )
      );

  /**
   * Effect: Get Campaign Fields
   * Loads dynamic fields/variables for a selected campaign slug.
   * Used for field mapping and template customization.
   */
      getCampaignFields$ = createEffect(() =>
        this.actions$.pipe(
          ofType(getCampaignFields),
          exhaustMap(({ slug, sync, authkey }) =>
            this.service.getCampaignAllFields({ slug, sync }, authkey).pipe(
              map((response) => {
                if (response?.hasError) {
                  return getCampaignFieldsFailure({ error: response.errors || ['Unknown error'] });
                }
                return getCampaignFieldsSuccess({ data: response.data });
              }),
              catchError((error) => {
                return of(getCampaignFieldsFailure({ error: [error?.message || 'Something went wrong'] }));
              })
            )
          )
        )
      );
    
      
}


