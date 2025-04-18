import { ActionReducerMap } from '@ngrx/store';
import { otpReducer, IOtpState } from './reducers/otp.reducers'; // Ensure correct imports

export interface IAppState {
    otp: IOtpState;
}

export const reducers: ActionReducerMap<IAppState> = {
    otp: otpReducer,
};