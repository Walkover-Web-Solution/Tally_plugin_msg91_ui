import { Action, createReducer, on } from "@ngrx/store";
import { otpActions } from "../actions";
import { getWalletBalanceFailure, getWalletBalanceSuccess } from "../actions/otp.action";

export interface IOtpState {
    widgetData: any;
    loading: boolean;
    otpResponse: any | null;
    error: any | null;
    verifyOtpData: any;
    verifyOtpInProcess: boolean;
    verifyOtpSuccess: boolean;
    errors: string[] | null;
    apiErrorResponse: any | null;
    token: string | null;
    walletBalance: number;
    paymentUrl:string | null;
}

export const initialState: IOtpState = {
    widgetData: null,
    loading: false,
    otpResponse: null,
    error: null,
    verifyOtpData: null,
    verifyOtpInProcess: false,
    verifyOtpSuccess: false,
    errors: null,
    apiErrorResponse: null,
    token: null,
    walletBalance: 0,
    paymentUrl: null
};

export function otpReducer(state: IOtpState | undefined, action: Action) {
    return _otpReducer(state ?? initialState, action);
}

const _otpReducer = createReducer(
    initialState,
    on(otpActions.getWidgetData, (state) => {
        return {
            ...state,
            widgetDataInProcess: true,
            widgetDataSuccess: false,
            errors: null,
            closeWidgetApiFailed: false,
        };
    }),
    on(otpActions.getWidgetDataComplete, (state, { response }) => {
        return {
            ...state,
            widgetData: response,
            widgetDataInProcess: false,
            widgetDataSuccess: true,
            closeWidgetApiFailed: false,
        };
    }),
    on(otpActions.getWidgetDataError, (state, { errors, errorResponse }) => {
        return {
            ...state,
            widgetDataInProcess: false,
            widgetDataSuccess: false,
            errors: errors,
            apiErrorResponse: errorResponse,
            closeWidgetApiFailed: true,
        };
    }),

    on(otpActions.sendOtpAction, (state) => {
        return {
            ...state,
            loading: true,
            otpResponse: null,
            error: null,
        };
    }),
    
    on(otpActions.sendOtpSuccess, (state, { response }) => {
        return {
            ...state,
            loading: false,
            otpResponse: response,
            error: null,
        };
    }),
    
      on(otpActions.sendOtpFailure, (state, { error }) => ({
        ...state,
        loading: false,
        otpResponse: null,
        error: error,
      })),

      on(otpActions.getOtpVerifyAction, (state) => ({
        ...state,
        loading: true,
        error: null,
      })),
    
      on(otpActions.getOtpVerifyActionComplete, (state, { response }) => { 
    const isOtpVerified = response.status === 'success' && !response.hasError;
  
    return {
      ...state,
      loading: false,
      otpVerified: isOtpVerified, 
    };
}),
    
      on(otpActions.getOtpVerifyActionError, (state, { errors }) => {
       return {
        ...state,
        loading: false,
        otpVerified: false,
        error: errors.join(', '),
       }
       
      }),



      on(otpActions.existOtpVerify, (state) => ({
        ...state,
        loading: true,
        error: null,
      })),
    
    on(otpActions.existOtpVerifyActionComplete, (state, { response }) => {
    const isExistOtpVerified = response.status === 'success' && !response.hasError;

    return {
      ...state,
      loading: false,
      existotpVerified: isExistOtpVerified, // Set `true` only if OTP is verified
    };
}),
    
      on(otpActions.existOtpVerifyActionError, (state, { errors }) => {
       return {
        ...state,
        loading: false,
        otpVerified: false,
        error: errors.join(', '),
       }
       
      }),

    on(otpActions.registerSuccess, (state, {token}) => ({
            ...state,
            token,
            error:null,
    })),

    on(otpActions.registerFailure, (state, {error}) => ({
            ...state,
            error,
    })),

    on(otpActions.getWalletBalanceSuccess, (state, {balance}) => ({
            ...state,
            walletBalance: balance,
            error: null
    })),
    on(otpActions.getWalletBalanceFailure, (state, {error}) => ({
            ...state,
            error,
    })),

    on(otpActions.rechargeWalletAction, (state) => ({
        ...state,
        loading: true,
        error: null
      })),
      on(otpActions.rechargeWalletSuccess, (state, { paymentUrl }) => ({
        ...state,
        loading: false,
        paymentUrl
      })),

      on(otpActions.rechargeWalletError, (state, { error }) => ({
        ...state,
        loading: false,
        error
      }))

);


    
