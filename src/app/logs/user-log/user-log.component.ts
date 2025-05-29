import { Component, EventEmitter, Output, SimpleChanges } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { distinctUntilChanged, Observable, of, takeUntil } from "rxjs";
import { selectAllFlow, selectAllFlowInProcess, selectCampaignFields, selectUser } from "../../otp/send-otp/store/selectors";
import { select, Store } from "@ngrx/store";
import { isEqual } from "lodash-es";
import { BaseComponent } from '../../../libs/ui/base-component/base.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { getAllFlow, getCampaignFields, getUserAction } from "../../otp/send-otp/store/actions/otp.action";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from "@angular/forms";
import { CampaignAutocompleteComponent } from "../../../libs/ui/campaign-autocomplete/campaign-autocomplete.component";
import { LoaderButtonDirective } from "../../../libs/loader-button/directives-loader-button.module";
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    NgFor,
    CampaignAutocompleteComponent,
    LoaderButtonDirective,
    MatSelectModule,
    MatCardModule
  ],
  providers: [],
  standalone: true
})



export class UserLogComponent extends BaseComponent {

  public userData$: Observable<any>;
  public get$: Observable<any>;
  public fetchCampaignInProcess$ = of(false);
  public campaignForm = new FormControl<any>(null, [Validators.required]);
  public getCampaign$: Observable<any>;
  public getCampaignField$: Observable<any>
  public params: any;
  public campaignFields:string[] = [];
  public campaignSelectedOnce: boolean = false;
  @Output() campaignSelected = new EventEmitter<any>();

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mobile: new FormControl({ value: '', disabled: true }),
    email: new FormControl({ value: '', disabled: true }),
  });

  myControl = new FormControl('');
  options: string[] = ['Payment', 'Purchase', 'Receipt', 'CreditNote', 'DebitNote', 'Invoice', 'Ledger'];

  tallyControl = new FormControl('');
  tallyVariables: string[] = ['customer_name', 'total_due', 'attachments', 'voucherdate','contactperson','address','state','pincode','phone','mobile','fax','email']

  auth = new FormGroup({
    authkey: new FormControl('')
  })


  constructor(private store: Store) {
    super();
    this.userData$ = this.store.pipe(
      select(selectUser),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
    this.get$ = this.store.pipe(
      select(selectAllFlow),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
    this.getCampaign$ = this.store.pipe(
      select(selectAllFlowInProcess),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
    this.getCampaignField$ = this.store.pipe(
      select(selectCampaignFields),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
  }

  ngOnInit() {
    this.userData$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      console.log("Respones", res)
      if (res) {
        this.userForm.get('name')?.setValue(res?.name);
        this.userForm.get('email')?.setValue(res?.email);
        this.userForm.get('mobile')?.setValue(res?.mobile ? res.mobile : '--Not Provided--');
      }
    })

    this.store.dispatch(getUserAction());

    this.auth.get('authkey')?.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((authkey: string | null) => {
        if (authkey && authkey.trim().length > 10) { // adjust length as needed
          const param = { getAll: true, itemsPerPage: 25, pageNo: 1 };
          this.store.dispatch(getAllFlow({ authkey, param }));
        }
      });

    this.getCampaignField$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        if (res?.variables?.length > 0) {
          console.log("Hello")
          this.campaignFields = Array.isArray(res.variables) ? res.variables : [];
        }
        console.log("Campaign Fields",this.campaignFields)
      });
    
  }

  // public verify() {
  //     const authkey = this.auth?.get('authkey')?.value as string; 
  //     console.log("authkey",authkey)
  //     const param = { getAll: true, itemsPerPage: 25, pageNo: 1 }; 

  //     this.store.dispatch(getAllFlow({ authkey, param }));

  // }

  get authkey(): string {
    return this.auth.get('authkey')?.value ?? '';
  }

  public onCampaignSelected(campaign: any): void {
    if (!campaign?.slug || !this.authkey) {
      console.warn('Missing slug or authkey');
      return;
    }

    this.campaignFields = [];
    this.campaignSelectedOnce = true;

    this.store.dispatch(getCampaignFields({
      slug: campaign.slug,
      sync: true,
      authkey: this.authkey
    }));
  }
}