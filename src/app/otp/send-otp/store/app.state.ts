import { ActionReducerMap } from '@ngrx/store';
import { otpReducer, IOtpState } from './reducers/otp.reducer'; // Ensure correct imports

export interface IAppState {
    otp: IOtpState;
}

