import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { WalletRechargeDialogComponent } from './wallet-recharge-dialog.component';

@NgModule({
  declarations: [
    WalletRechargeDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class WalletRechargeDialogModule { }
