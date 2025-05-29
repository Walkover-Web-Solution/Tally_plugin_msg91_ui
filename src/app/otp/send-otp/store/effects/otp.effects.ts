import { inject, Injectable } from "@angular/core";
import { otpActions } from "../actions/index";
import { catchError, EMPTY, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import {Actions, createEffect, ofType} from '@ngrx/effects'
import { ServicesProxyLogsService } from "../../../../services/services-proxy-logs.service";
import { getAllFlow, getAllFlowFailure, getAllFlowSuccess, getCampaignFields, getCampaignFieldsFailure, getCampaignFieldsSuccess, getUserAction, getUserFailure, getUserSuccess, getWalletBalanceAction, getWalletBalanceFailure, getWalletBalanceSuccess, rechargeWalletAction, rechargeWalletError, rechargeWalletSuccess, registerAction, registerFailure, registerSuccess } from "../actions/otp.action";
import { PrimeNgToastService } from "../../../../../libs/prime-ng-toast.service";
import { BaseResponse, errorResolver } from "../../../../models/root-models";
import { tapResponse } from "@ngrx/component-store";


@Injectable()
export class OtpEffects {
     constructor( private toast: PrimeNgToastService) {}

     actions$ = inject(Actions)
     service: ServicesProxyLogsService = inject(ServicesProxyLogsService)
    
     sendOtp$ = createEffect(() =>
      this.actions$.pipe(
        ofType(otpActions.sendOtpAction),
        switchMap(({ mobile }) =>
          this.service.sendOtp(mobile).pipe(
            map((response) => {
              console.log("ehlefjl")
              this.toast.success('OTP sent successfully'); 
              return otpActions.sendOtpSuccess({ response });
            }),
            catchError((error) => {
              this.toast.error(error); // ✅ toast error
              return of(otpActions.sendOtpFailure({ error }));
            })
          )
        )
      )
    );
    

    verifyOtp$ = createEffect(() =>
  this.actions$.pipe(
    ofType(otpActions.getOtpVerifyAction),
    switchMap(({ request }) =>
      this.service.verfiyOtp(request.mobile, request.otp).pipe(
        map((res: any) => {
          if (res.status === 'success' && !res.hasError) {
            return otpActions.getOtpVerifyActionComplete({ response: res });
          }

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

existinguser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(otpActions.existOtpVerify),
    switchMap(({ request }) =>
      this.service.existinguser(request.mobile, request.otp).pipe(
        map((res: any) => {
          if (res.status === 'success' && !res.hasError) {
            return otpActions.existOtpVerifyActionComplete({ response: res });
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
      

      getCampaign$ = createEffect(() =>
          this.actions$.pipe(
            ofType(getAllFlow),
            tap(({ authkey, param }) => {
              console.log('Dispatched getAllFlow with:');
              console.log('authKey:', authkey);
              console.log('param:', param);
            }),
            switchMap(({ param, authkey }) =>
              this.service.getAllCampaignFlowFromApi( param, authkey ).pipe(
                tap((flow) => {
                  console.log('API response:', flow);
                }),
                map((flow: BaseResponse<any, void>) => {
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
                  console.error('Error from getAllCampaignFlowFromApi:', error);
                  return of(getAllFlowFailure({ error }));
                })
              )
            )
        )
      );

      getCampaignFields$ = createEffect(() =>
        this.actions$.pipe(
          ofType(getCampaignFields),
          tap(() => console.log('[Effect] getCampaignFields triggered')),
          exhaustMap(({ slug, sync, authkey }) =>
            this.service.getCampaignAllFields({ slug, sync }, authkey).pipe(
              map((response) => {
                console.log('[Effect] API Response:', response);
                if (response?.hasError) {
                  return getCampaignFieldsFailure({ error: response.errors || ['Unknown error'] });
                }
                return getCampaignFieldsSuccess({ data: response.data });
              }),
              catchError((error) => {
                console.error('[Effect] API Error:', error);
                return of(getCampaignFieldsFailure({ error: [error?.message || 'Something went wrong'] }));
              })
            )
          )
        )
      );
    
      
}


