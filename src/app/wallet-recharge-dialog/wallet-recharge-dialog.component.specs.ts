import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletRechargeDialogComponent } from './wallet-recharge-dialog.component';

describe('WalletRechargeDialogComponent', () => {
  let component: WalletRechargeDialogComponent;
  let fixture: ComponentFixture<WalletRechargeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletRechargeDialogComponent]
    });
    fixture = TestBed.createComponent(WalletRechargeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
