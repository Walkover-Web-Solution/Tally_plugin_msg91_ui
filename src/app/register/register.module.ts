// import { NgModule } from "@angular/core";
// import {RegisterComponent} from "../register/register.component"
// import { RouterModule, Routes } from "@angular/router";
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import {MatInputModule} from '@angular/material/input';
// import {MatCardModule} from '@angular/material/card';
// import {MatButtonModule} from '@angular/material/button';
// import { StoreModule } from "@ngrx/store";
// import { otpReducer } from "../otp/send-otp/store/reducers/otp.reducer";
// import { EffectsModule } from "@ngrx/effects";
// import { OtpEffects } from "../otp/send-otp/store/effects";

// const routes: Routes = [
//     {
//       path: '',
//       component: RegisterComponent,
//       pathMatch: 'full'
//     }
//   ];
  
// @NgModule({
//     declarations: [RegisterComponent],
//     imports: [
//         RouterModule.forChild(routes),
//         MatFormFieldModule,
//         CommonModule,
//         ReactiveFormsModule,
//         MatInputModule,
//         MatCardModule,
//         MatButtonModule,
//         StoreModule.forFeature('otp', otpReducer),
//         EffectsModule.forFeature([OtpEffects]),
//         // StoreModule.forFeature('otp', otpReducer),
//         // EffectsModule.forFeature([OtpEffects]),
//     ],
// })

// export class RegisterModule {}