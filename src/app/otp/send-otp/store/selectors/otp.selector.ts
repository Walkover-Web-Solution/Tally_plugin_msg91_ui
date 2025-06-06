import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "../app.state";


export const selectState = (state: IAppState) => state;


export const selectOtpState = createFeatureSelector<any>('otp');

export const selectOtpLoading = createSelector(
  selectOtpState,
  (state) => state.loading
);

export const selectOtpResponse = createSelector(
  selectOtpState,
  (state) => state.otpResponse
);

export const selectOtpError = createSelector(
  selectOtpState,
  (state) => state.error
);

// export const verifyOtpData = createSelector(
//     selectOtpState,
//     (state) => state.verifyOtpData
// );

// export const verifyOtpInProcess = createSelector(
//      selectOtpState,
//      (state) => state.verifyOtpInprocess
// )
// export const verifyOtpSuccess = createSelector(
//     selectOtpState,
//     (state) => state.verifyOtpData
// );

// export const verifyOtpError = createSelector(
//   selectOtpState,
//   (state) => state.verifyOtpError  
// );

export const selectOtpVerified = createSelector(
  selectOtpState,
  (state) => state.otpVerified
);

export const selectOtpVerifiedLoading = createSelector(
  selectOtpState,
  (state) => state.loading
);

export const selectOtpVerifiedError = createSelector(
  selectOtpState,
  (state) => state.error
);

export const selectexistOtpVerified = createSelector(
  selectOtpState,
  (state) => state.existotpVerified
);

export const selectexistOtpVerifiedLoading = createSelector(
  selectOtpState,
  (state) => state.loading
);

export const selectexistOtpVerifiedError = createSelector(
  selectOtpState,
  (state) => state.error
);

export const registerSuccess = createSelector(
    selectOtpState,
    (state) => state.token
)

export const registerFailure = createSelector(
     selectOtpState,
     (state)=> state.error
);

export const getWalletBalanceLoading = createSelector(
      selectOtpState,
      (state) => state.walletBalanceLoading
)

export const getWalletBalanceSuccess = createSelector(
    selectOtpState,
    (state) => state?.walletBalance?.data?.meta?.balance ?? 0
);

export const getWalletBalanceFailure = createSelector(
      selectOtpState,
      (state) => state.error
);

export const selectPaymentUrl = createSelector(
  selectOtpState,
  (state) => state.paymentUrl
);

export const selectWalletLoading = createSelector(
  selectOtpState,
  (state) => state.loading
);

export const selectWalletError = createSelector(
  selectOtpState,
  (state) => state.error
);

export const selectUser = createSelector(
  selectOtpState,
  (state) => state.data
);

export const selectUserLoading = createSelector(
  selectOtpState,
  (state) => state.loading
);

export const selectAllFlowInProcess = createSelector(
     selectOtpState,
     (state) => state.getAllFlowInProcess
)

export const selectAllFlow = createSelector(
    selectOtpState,
    (state) => state.campaigns
);

export const selectCampaignFields = createSelector(
  selectOtpState,
  (state) => state.campaignFields
);

export const selectCampaignFieldsLoading = createSelector(
  selectOtpState,
  (state) => state.getCampaignFieldInProcess
);

export const selectCampaignFieldsError = createSelector(
  selectOtpState,
  (state) => state.campaignFieldsError
);