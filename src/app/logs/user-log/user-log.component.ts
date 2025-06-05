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
  // Observable streams from the store
  public userData$: Observable<any>;
  public get$: Observable<any>;
  public getCampaign$: Observable<any>;
  public getCampaignField$: Observable<any>;

  public fetchCampaignInProcess$ = of(false); // Tracks whether campaign fetching is in progress
  public campaignForm = new FormControl<any>(null, [Validators.required]);
  public params: any;
  public campaignFields:string[] = [];
  public campaignSelectedOnce: boolean = false;
  @Output() campaignSelected = new EventEmitter<any>();

  // FormGroup for user profile details
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mobile: new FormControl({ value: '', disabled: true }),
    email: new FormControl({ value: '', disabled: true }),
  });

  // Voucher type autocomplete
  myControl = new FormControl('');
  options: string[] = ['Payment', 'Purchase', 'Receipt', 'CreditNote', 'DebitNote', 'Invoice', 'Ledger'];

   // Tally variable form control and options
  tallyControl = new FormControl('');
  tallyVariables: string[] = ['customer_name', 'total_due', 'attachments', 'voucherdate','contactperson','address','state','pincode','phone','mobile','fax','email']

   // FormGroup for auth key input
  auth = new FormGroup({
    authkey: new FormControl('')
  })


  constructor(private store: Store) {
    super();
     // Select user data from store
    this.userData$ = this.store.pipe(
      select(selectUser),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )

    // Select all flows (campaigns)
    this.get$ = this.store.pipe(
      select(selectAllFlow),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )

    // Select flow loading state
    this.getCampaign$ = this.store.pipe(
      select(selectAllFlowInProcess),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )

     // Select campaign fields (variables) for the selected campaign
    this.getCampaignField$ = this.store.pipe(
      select(selectCampaignFields),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
  }

  ngOnInit() {
     // Populate user form from store
    this.userData$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (res) {
        this.userForm.get('name')?.setValue(res?.name);
        this.userForm.get('email')?.setValue(res?.email);
        this.userForm.get('mobile')?.setValue(res?.mobile ? res.mobile : '--Not Provided--');
      }
    })

    // Dispatch action to fetch user data
    this.store.dispatch(getUserAction());

     // Watch for changes in the auth key and trigger campaign fetch
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

      // Update campaign fields from store after selection
    this.getCampaignField$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        if (res?.variables?.length > 0) {
          this.campaignFields = Array.isArray(res.variables) ? res.variables : [];
        }
      });
    
  }

  // Getter for current auth key
  get authkey(): string {
    return this.auth.get('authkey')?.value ?? '';
  }

   // Handles logic when a campaign is selected from autocomplete
  public onCampaignSelected(campaign: any): void {
    if (!campaign?.slug || !this.authkey) {
      return;
    }

     // Reset previous mappings and flag campaign selection
    this.campaignFields = [];
    this.campaignSelectedOnce = true;

     // Dispatch action to fetch campaign-specific variable mappings
    this.store.dispatch(getCampaignFields({
      slug: campaign.slug,
      sync: true,
      authkey: this.authkey
    }));
  }
}