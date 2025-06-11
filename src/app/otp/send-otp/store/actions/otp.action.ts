import { createAction, props } from '@ngrx/store';
import { Flow } from '../../../../models/root-models';

/**
 * Initiates a request to fetch widget-related data, usually tied to a reference ID.
 * Often used to preload data for dynamic or reusable widgets.
 */
export const getWidgetData = createAction(
  '[Auth] Get Widget Data',
  props<{ referenceId: string; payload?: { [key: string]: any } }>()
);

/**
 * Dispatched when widget data is successfully fetched.
 * The response will contain data to populate the widget UI.
 */
export const getWidgetDataComplete = createAction(
  '[OTP] Get Widget Data Complete',
  props<{ response: any }>()
);

/**
 * Dispatched when there's an error fetching widget data.
 * Useful for displaying error messages or fallback UI.
 */
export const getWidgetDataError = createAction(
  '[OTP] Get Widget Data Error',
  props<{ errors: string[]; errorResponse: any }>()
);

/**
 * Sends OTP to the given mobile number.
 * Triggered when a user initiates login or authentication via mobile.
 */
export const sendOtpAction = createAction(
  '[OTP] Send OTP',
  props<{ mobile: string }>()
);

/** 
 * Dispatched when OTP is sent successfully to the user.
 */
export const sendOtpSuccess = createAction(
  '[OTP] Send OTP Success',
  props<{ response: any }>()
);

/**
 * Dispatched when sending OTP fails (e.g., invalid number, server error).
 */
export const sendOtpFailure = createAction(
  '[OTP] Send OTP Failure',
  props<{ error: any }>()
);

/**
 * Verifies the OTP input by the user.
 * Used during login/registration flows.
 */
export const getOtpVerifyAction = createAction(
  '[OTP] Get OTP Verify',
  props<{ request: { mobile: string; otp: string } }>()
);

/**
 * Dispatched on successful OTP verification.
 */
export const getOtpVerifyActionComplete = createAction(
  '[OTP] Get OTP Verify Complete',
  props<{ response: any }>()
);

/**
 * Dispatched when OTP verification fails.
 */
export const getOtpVerifyActionError = createAction(
  '[OTP] Get OTP Verify Error',
  props<{ errors: string[]; errorResponse: any }>()
);

/**
 * Alternative OTP verification used in cases like pre-verified accounts.
 */
export const existOtpVerify = createAction(
  '[OTP] Exist OTP Verify',
  props<{ request: { mobile: string; otp: string } }>()
);

/**
 * Dispatched when existing OTP is verified successfully.
 */
export const existOtpVerifyActionComplete = createAction(
  '[OTP] Exist OTP Verify Complete',
  props<{ response: any }>()
);

/**
 * Dispatched when existing OTP verification fails.
 */
export const existOtpVerifyActionError = createAction(
  '[OTP] Exist OTP Verify Error',
  props<{ errors: string[]; errorResponse: any }>()
);

/**
 * Initiates user registration by sending name, email, and mobile.
 */
export const registerAction = createAction(
  '[Auth] Register',
  props<{ name: string; email: string; mobile: string }>()
);

/**
 * Dispatched when user registration is successful.
 */
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ token: string }>()
);

/**
 * Dispatched when registration fails (e.g., duplicate email, validation issues).
 */
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);

/**
 * Requests the current user's wallet balance.
 */
export const getWalletBalanceAction = createAction(
  '[Auth] Get Wallet Balance'
);

/**
 * Dispatched when wallet balance is fetched successfully.
 */
export const getWalletBalanceSuccess = createAction(
  '[Auth] Wallet Balance Success',
  props<{ balance: any }>()
);

/**
 * Dispatched when fetching wallet balance fails.
 */
export const getWalletBalanceFailure = createAction(
  '[Auth] Wallet Balance Failure',
  props<{ error: any }>()
);

/**
 * Triggers a wallet recharge with provided token (payment source) and amount.
 */
export const rechargeWalletAction = createAction(
  '[Wallet] Recharge Wallet',
  props<{ token: any; amount: any }>()
);

/**
 * Dispatched when recharge process returns a payment URL.
 * This URL can be redirected to for payment gateway.
 */
export const rechargeWalletSuccess = createAction(
  '[Wallet] Recharge Wallet Success',
  props<{ paymentUrl: string }>()
);

/**
 * Dispatched when wallet recharge fails.
 */
export const rechargeWalletError = createAction(
  '[Wallet] Recharge Wallet Error',
  props<{ error: any }>()
);

/**
 * Triggers a request to get logged-in user details.
 */
export const getUserAction = createAction('[Auth] Get User');

/**
 * Dispatched when user details are fetched successfully.
 */
export const getUserSuccess = createAction(
  '[Auth] Get User Success',
  props<{ data: any }>()
);

/**
 * Dispatched when there's an error fetching user details.
 */
export const getUserFailure = createAction(
  '[Auth] Get User Failure',
  props<{ error: any }>()
);

/**
 * Loads all campaign flows available for the given auth key.
 * Optionally accepts pagination and filtering parameters.
 */
export const getAllFlow = createAction(
  '[Campaign] Load All Campaigns',
  props<{ authkey: string; param: { [key: string]: any } }>()
);

/**
 * Dispatched when campaigns are loaded successfully.
 * Includes campaign list and optional pagination metadata.
 */
export const getAllFlowSuccess = createAction(
  '[Campaign] Load All Campaigns Success',
  props<{ campaigns: Flow[]; pagination?: any }>()
);

/**
 * Dispatched when there's an error loading campaign flows.
 */
export const getAllFlowFailure = createAction(
  '[Campaign] Load All Campaigns Failure',
  props<{ error: any }>()
);

/**
 * Loads variable fields (like dynamic template placeholders) for a given campaign slug.
 */
export const getCampaignFields = createAction(
  '[Campaign Fields] Load All Campaign Fields',
  props<{ slug?: any; sync?: boolean; authkey: string }>()
);

/**
 * Dispatched when campaign fields are loaded successfully.
 */
export const getCampaignFieldsSuccess = createAction(
  '[Campaign Fields] Load All Campaign Fields',
  props<{ data: any }>()
);

/**
 * Dispatched when there's an error loading campaign fields.
 */
export const getCampaignFieldsFailure = createAction(
  '[Campaign Fields] Load All Campaign Fields',
  props<{ error: any }>()
);