import { createAction, props } from '@ngrx/store';

export const getWidgetData = createAction(
    '[Auth] Get Widget Data',
    props<{ referenceId: string; payload?: { [key: string]: any } }>()
);
export const getWidgetDataComplete = createAction('[OTP] Get Widget Data Complete', props<{ response: any }>());
export const getWidgetDataError = createAction(
    '[OTP] Get Widget Data Error',
    props<{ errors: string[]; errorResponse: any }>()
);

export const sendOtpAction = createAction(
    '[OTP] Send OTP',
    props<{ mobile: string }>()
  );
  
  export const sendOtpSuccess = createAction(
    '[OTP] Send OTP Success',
    props<{ response: any }>()
  );
  
  export const sendOtpFailure = createAction(
    '[OTP] Send OTP Failure',
    props<{ error: any }>()
  );
  

export const getOtpVerifyAction = createAction(
    '[OTP] Get OTP Verify',
    props<{ request: { mobile: string; otp: string } }>()
);

export const getOtpVerifyActionComplete = createAction(
    '[OTP] Get OTP Verify Complete',
    props<{ response: any }>()
);

export const getOtpVerifyActionError = createAction(
    '[OTP] Get OTP Verify Error',
    props<{ errors: string[]; errorResponse: any }>()
);


export const existOtpVerify = createAction(
  '[OTP] Exist OTP Verify',
  props<{ request: { mobile: string; otp: string } }>()
);

export const existOtpVerifyActionComplete = createAction(
  '[OTP] Exist OTP Verify Complete',
    props<{ response: any }>()
);

export const existOtpVerifyActionError = createAction(
  '[OTP] Exist OTP Verify Error',
  props<{ errors: string[]; errorResponse: any }>()
);

export const registerAction = createAction(
      "[Auth] Register",
      props<{name:string, email:string, mobile:string}>()
);

export const registerSuccess = createAction(
  "[Auth] Register Success",
  props<{token:string}>()
);

export const registerFailure = createAction(
  "[Auth] Register Failure",
  props<{error:any}>()
);

export const getWalletBalanceAction = createAction(
      "[Auth] Get Wallet Balance",
);

export const getWalletBalanceSuccess = createAction(
  "[Auth] Wallet Balance Success",
  props<{ balance: any }>()
);

export const getWalletBalanceFailure = createAction(
  "[Auth] Wallet Balance Failure",
  props<{ error: any }>()
);

export const rechargeWalletAction = createAction(
       '[Wallet] Recharge Wallet',
        props<{token:any, amount:any}>()
      );
export const rechargeWalletSuccess = createAction(
  '[Wallet] Recharge Wallet Success',
  props<{ paymentUrl: string }>()
);
export const rechargeWalletError = createAction(
  '[Wallet] Recharge Wallet Error',
  props<{ error: any }>()
);




