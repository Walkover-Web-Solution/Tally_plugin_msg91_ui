// The reducer function handles state transitions for OTP and related features using NgRx
// It responds to dispatched actions and returns new state based on the payload and action type
import { Action, createReducer, on } from "@ngrx/store";
import { otpActions } from "../actions";
import { getWalletBalanceFailure, getWalletBalanceSuccess } from "../actions/otp.action";
import { IUserModel } from "../../../../models/root-models";

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
    walletBalanceLoading: boolean,

    user: IUserModel | null

    campaigns: any
    getAllFlowInProcess:boolean;
    getAllFlowInError: null,

    campaignFields: any;
    getCampaignFieldInProcess: boolean;
    campaignFieldsError: any | null;
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
    paymentUrl: null,
    walletBalanceLoading: false,
    user:null,

    campaigns: [],
    getAllFlowInProcess:false,
    getAllFlowInError: null,

    campaignFields: [],
    getCampaignFieldInProcess: false,
    campaignFieldsError: null
    
};

export function otpReducer(state: IOtpState | undefined, action: Action) {
    return _otpReducer(state ?? initialState, action);
}

// The reducer function handles state transitions for OTP and related features using NgRx
// It responds to dispatched actions and returns new state based on the payload and action type

const _otpReducer = createReducer(
  initialState,

  // -------------------- Widget Data Actions --------------------

  // Triggered when widget data fetching starts
  on(otpActions.getWidgetData, (state) => ({
      ...state,
      widgetDataInProcess: true,
      widgetDataSuccess: false,
      errors: null,
      closeWidgetApiFailed: false,
  })),

  // Triggered when widget data is successfully fetched
  on(otpActions.getWidgetDataComplete, (state, { response }) => ({
      ...state,
      widgetData: response,
      widgetDataInProcess: false,
      widgetDataSuccess: true,
      closeWidgetApiFailed: false,
  })),

  // Triggered when fetching widget data fails
  on(otpActions.getWidgetDataError, (state, { errors, errorResponse }) => ({
      ...state,
      widgetDataInProcess: false,
      widgetDataSuccess: false,
      errors,
      apiErrorResponse: errorResponse,
      closeWidgetApiFailed: true,
  })),

  // -------------------- Send OTP Actions --------------------

  // When OTP request is initiated
  on(otpActions.sendOtpAction, (state) => ({
      ...state,
      loading: true,
      otpResponse: null,
      error: null,
  })),

  // When OTP is successfully sent
  on(otpActions.sendOtpSuccess, (state, { response }) => ({
      ...state,
      loading: false,
      otpResponse: response,
      error: null,
  })),

  // When OTP sending fails
  on(otpActions.sendOtpFailure, (state, { error }) => ({
      ...state,
      loading: false,
      otpResponse: null,
      error,
  })),

  // -------------------- OTP Verification for New User --------------------

  // When OTP verification starts
  on(otpActions.getOtpVerifyAction, (state) => ({
      ...state,
      loading: true,
      error: null,
  })),

  // When OTP is successfully verified
  on(otpActions.getOtpVerifyActionComplete, (state, { response }) => ({
      ...state,
      loading: false,
      otpVerified: response.status === 'success' && !response.hasError,
  })),

  // When OTP verification fails
  on(otpActions.getOtpVerifyActionError, (state, { errors }) => ({
      ...state,
      loading: false,
      otpVerified: false,
      error: errors.join(', '),
  })),

  // -------------------- OTP Verification for Existing User --------------------

  // When existing user OTP verification starts
  on(otpActions.existOtpVerify, (state) => ({
      ...state,
      loading: true,
      existotpVerified: false,
      error: null,
  })),

  // When OTP is successfully verified for existing user
  on(otpActions.existOtpVerifyActionComplete, (state, { response }) => ({
      ...state,
      loading: false,
      otpVerified: true,
      existotpVerified: response.status === 'success' && !response.hasError,
  })),

  // When OTP verification fails for existing user
  on(otpActions.existOtpVerifyActionError, (state, { errors }) => ({
      ...state,
      loading: false,
      existotpVerified: false,
      error: errors.join(', '),
  })),

  // -------------------- Registration --------------------

  // On successful registration, save the token
  on(otpActions.registerSuccess, (state, { token }) => ({
      ...state,
      token,
      error: null,
  })),

  // On registration failure
  on(otpActions.registerFailure, (state, { error }) => ({
      ...state,
      error,
  })),

  // -------------------- Wallet Balance --------------------

  // When wallet balance fetch is triggered
  on(otpActions.getWalletBalanceAction, (state) => ({
      ...state,
      walletBalanceLoading: true,
  })),

  // When wallet balance is successfully fetched
  on(otpActions.getWalletBalanceSuccess, (state, { balance }) => ({
      ...state,
      walletBalanceLoading: false,
      walletBalance: balance,
      error: null,
  })),

  // When wallet balance fetch fails
  on(otpActions.getWalletBalanceFailure, (state, { error }) => ({
      ...state,
      walletBalanceLoading: false,
      error,
  })),

  // -------------------- Wallet Recharge --------------------

  // When recharge request is initiated
  on(otpActions.rechargeWalletAction, (state) => ({
      ...state,
      loading: true,
      error: null,
  })),

  // When recharge is successful and payment URL is received
  on(otpActions.rechargeWalletSuccess, (state, { paymentUrl }) => ({
      ...state,
      loading: false,
      paymentUrl,
  })),

  // When recharge fails
  on(otpActions.rechargeWalletError, (state, { error }) => ({
      ...state,
      loading: false,
      error,
  })),

  // -------------------- User Profile --------------------

  // When user profile fetch is triggered
  on(otpActions.getUserAction, (state) => ({
      ...state,
      loading: true,
      error: null,
  })),

  // When user profile is successfully fetched
  on(otpActions.getUserSuccess, (state, { data }) => ({
      ...state,
      data,
      loading: false,
  })),

  // When user profile fetch fails
  on(otpActions.getUserFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
  })),

  // -------------------- Get All Campaign Flows --------------------

  // When campaign flow fetching begins
  on(otpActions.getAllFlow, (state) => ({
      ...state,
      getAllFlowError: null,
      getAllFlowInProcess: true,
  })),

  // When campaign flows are successfully fetched
  on(otpActions.getAllFlowSuccess, (state, { campaigns, pagination }) => ({
      ...state,
      campaigns,
      pagination,
      getAllFlowInProcess: false,
      getAllFlowError: null,
  })),

  // When campaign flows fetching fails
  on(otpActions.getAllFlowFailure, (state, { error }) => ({
      ...state,
      getAllFlowInProcess: false,
      getAllFlowError: error,
  })),

  // -------------------- Campaign Field Mapping --------------------

  // When fetching campaign fields starts
  on(otpActions.getCampaignFields, (state) => ({
      ...state,
      getCampaignFieldInProcess: true,
      campaignFieldsError: null,
  })),

  // When campaign fields are successfully fetched
  on(otpActions.getCampaignFieldsSuccess, (state, { data }) => ({
      ...state,
      campaignFields: data,
      getCampaignFieldInProcess: false,
  })),

  // When campaign fields fetch fails
  on(otpActions.getCampaignFieldsFailure, (state, { error }) => ({
      ...state,
      getCampaignFieldInProcess: false,
      campaignFieldsError: error,
  }))
);


    
