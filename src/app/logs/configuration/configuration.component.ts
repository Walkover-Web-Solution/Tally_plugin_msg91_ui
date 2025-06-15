import { Component, EventEmitter, Output, SimpleChanges } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, distinctUntilChanged, Observable, of, takeUntil } from "rxjs";
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
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    CampaignAutocompleteComponent,
    MatSelectModule,
    MatCardModule,
    MatSlideToggleModule
  ],
  providers: [],
  standalone: true
})



export class ConfigurationComponent extends BaseComponent {
  // Observable streams from the store
  public get$: Observable<any>;
  public getCampaign$: Observable<any>;
  public getCampaignField$: Observable<any>;
  public userData$: Observable<any>;

  public fetchCampaignInProcess$ = of(false); // Tracks whether campaign fetching is in progress
  public campaignForm = new FormControl<any>(null, [Validators.required]);
  public params: any;
  public campaignFields: string[] = [];
  public campaignSelectedOnce: boolean = false;
  public useCustomAuth: boolean = false;
  public hasDefaultAuthkey = false;
  public defaultAuthkey: string | null = null;
  @Output() campaignSelected = new EventEmitter<any>();

  // Voucher type autocomplete
  myControl = new FormControl('');
  options: string[] = ['Payment', 'Purchase', 'Receipt', 'CreditNote', 'DebitNote', 'Invoice', 'Ledger'];

  // Tally variable form control and options
  tallyControl = new FormControl('');
  tallyVariables: string[] = ['tally1', 'tally2', 'tally3'];

  // FormGroup for auth key input
  auth = new FormGroup({
    authkey: new FormControl(''),
    useCustomAuth: new FormControl(false)
  })

  constructor(private store: Store) {
    super();

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
    this.store.dispatch(getUserAction());

    this.userData$.subscribe(res => {
      const meta = res?.meta;
      if (meta && meta.authkey) {
        this.hasDefaultAuthkey = true;
        this.defaultAuthkey = meta.authkey;
        this.auth.patchValue({ authkey: this.defaultAuthkey, useCustomAuth: false });
        this.fetchCampaignFields(meta.authkey);
      } else {
        this.hasDefaultAuthkey = false;
        this.defaultAuthkey = null;
        this.auth.patchValue({ authkey: '', useCustomAuth: true });
      }
    });

    this.auth.get('useCustomAuth')?.valueChanges.subscribe((useCustom) => {
      if (!useCustom && this.defaultAuthkey) {
        this.auth.patchValue({ authkey: this.defaultAuthkey });
        this.fetchCampaignFields(this.defaultAuthkey);
      }

      this.campaignFields = [];
      this.campaignSelectedOnce = false;
      this.campaignForm.setValue('');
      this.myControl.setValue('');
      this.tallyControl.setValue('');
      this.refreshCampaigns();
    });

    this.auth.get('authkey')?.valueChanges.subscribe(() => {
    this.campaignForm.setValue('');
    this.refreshCampaigns();
  });

    this.getCampaignField$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        if (res?.variables?.length > 0) {
          this.campaignFields = Array.isArray(res.variables) ? res.variables : [];
        }
      });


  }

  public refreshCampaigns(): void {
    this.verify();
  }

  // Method to fetch campaign fields based on authkey
  public fetchCampaignFields(authkey: string): void {
    this.store.dispatch(getCampaignFields({ authkey }));
  }

  // Getter for current auth key
  get authkey(): string {
    return this.auth.get('authkey')?.value ?? '';
  }

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

  public verify(): void {
    const authkey = this.auth.get('authkey')?.value ?? '';

    this.store.dispatch(getAllFlow({
      authkey,
      param: {
        getAll: true,
        itemsPerPage: 25,
        pageNo: 1
      }
    }))
  }

  public saveConfiguration() {
    const selectedCampaign = this.campaignForm.value;

    const voucherType = this.myControl.value;

    const payload = {
      campaign: selectedCampaign,
      voucherType: voucherType,
    }
  }

}