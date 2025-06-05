import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "../app.state";

// Root selector to access the entire state
export const selectState = (state: IAppState) => state;

// Feature selector to access the 'otp' slice from the state
export const selectOtpState = createFeatureSelector<any>('otp');


// <-- OTP Sending and Verification -->

// Selector for general loading state (used during sending or verifying OTP)
export const selectOtpLoading = createSelector(
  selectOtpState,
  (state) => state.loading
);

// Selector to get OTP send response
export const selectOtpResponse = createSelector(
  selectOtpState,
  (state) => state.otpResponse
);

// Selector to get error related to OTP operations
export const selectOtpError = createSelector(
  selectOtpState,
  (state) => state.error
);

// Selector to check if OTP is successfully verified
export const selectOtpVerified = createSelector(
  selectOtpState,
  (state) => state.otpVerified
);

// Selector to check loading status during OTP verification
export const selectOtpVerifiedLoading = createSelector(
  selectOtpState,
  (state) => state.loading
);

// Selector to get error during OTP verification
export const selectOtpVerifiedError = createSelector(
  selectOtpState,
  (state) => state.error
);


// <-- Existing User OTP Verification -->

// Selector to check if existing user's OTP is verified
export const selectexistOtpVerified = createSelector(
  selectOtpState,
  (state) => state.existotpVerified
);

// Selector for loading state during existing user OTP verification
export const selectexistOtpVerifiedLoading = createSelector(
  selectOtpState,
  (state) => state.loading
);

// Selector for error during existing user OTP verification
export const selectexistOtpVerifiedError = createSelector(
  selectOtpState,
  (state) => state.error
);


// <-- Registration -->

// Selector to get token on successful registration
export const registerSuccess = createSelector(
  selectOtpState,
  (state) => state.token
);

// Selector to get registration error
export const registerFailure = createSelector(
  selectOtpState,
  (state)=> state.error
);


// <-- Wallet Balance -->

// Selector for wallet balance loading state
export const getWalletBalanceLoading = createSelector(
  selectOtpState,
  (state) => state.walletBalanceLoading
);

// Selector to extract wallet balance from nested response
export const getWalletBalanceSuccess = createSelector(
  selectOtpState,
  (state) => state?.walletBalance?.data?.meta?.balance ?? 0
);

// Selector to get error related to wallet balance
export const getWalletBalanceFailure = createSelector(
  selectOtpState,
  (state) => state.error
);


// <-- Wallet Recharge -->

// Selector to get payment URL after recharge
export const selectPaymentUrl = createSelector(
  selectOtpState,
  (state) => state.paymentUrl
);

// Selector for general wallet recharge loading state
export const selectWalletLoading = createSelector(
  selectOtpState,
  (state) => state.loading
);

// Selector for wallet recharge error
export const selectWalletError = createSelector(
  selectOtpState,
  (state) => state.error
);


// <-- User Info -->

// Selector to get user profile data
export const selectUser = createSelector(
  selectOtpState,
  (state) => state.data
);

// Selector for loading state when fetching user info
export const selectUserLoading = createSelector(
  selectOtpState,
  (state) => state.loading
);


// <-- Campaign Flow -->

// Selector to check if campaign flow API is in progress
export const selectAllFlowInProcess = createSelector(
  selectOtpState,
  (state) => state.getAllFlowInProcess
);

// Selector to get all campaign flows
export const selectAllFlow = createSelector(
  selectOtpState,
  (state) => state.campaigns
);


// <--Campaign Fields Mapping -->

// Selector to get mapped campaign fields
export const selectCampaignFields = createSelector(
  selectOtpState,
  (state) => state.campaignFields
);

// Selector to check if campaign fields API is loading
export const selectCampaignFieldsLoading = createSelector(
  selectOtpState,
  (state) => state.getCampaignFieldInProcess
);

// Selector to get error related to campaign fields fetching
export const selectCampaignFieldsError = createSelector(
  selectOtpState,
  (state) => state.campaignFieldsError
);
