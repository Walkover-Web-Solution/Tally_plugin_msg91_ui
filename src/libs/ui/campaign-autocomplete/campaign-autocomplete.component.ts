import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from "@angular/core";
import { distinctUntilChanged, Observable, of, take, takeUntil } from "rxjs";
import { ServicesProxyLogsService } from "../../../app/services/services-proxy-logs.service";
import { BaseResponse, ISegmentGetAllCampaignReqModel } from "../../../app/models/root-models";
import { UntypedFormControl, ValidatorFn, Validators } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CDKScrollComponent } from "../../../libs/ui/cdk-scroll/cdk-scroll.component";
import { select, Store } from "@ngrx/store";
import { getCampaignFields } from "../../../app/otp/send-otp/store/actions/otp.action";
import { isEqual } from "lodash-es";
import { BaseComponent } from '../base-component/base.component';

@Component({
    selector: 'app-campaign-autocomplete',
    templateUrl: './campaign-autocomplete.component.html',
    styleUrls: ['./campaign-autocomplete.component.scss'],
    imports:[
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CDKScrollComponent
    ],
    standalone: true
})
export class CampaignAutocompleteComponent extends BaseComponent  {

    service: ServicesProxyLogsService = inject(ServicesProxyLogsService)
      
    public params: any = {};
    public apiInProgress$ = of(false);
    public campaigns$: Observable<ISegmentGetAllCampaignReqModel[]> = of([]);
    // public campaignFields$: Observable<any>;
    private ValidatorFnRef!: ValidatorFn;
    // autocompleteTrigger: MatAutocompleteTrigger;

    @ViewChild(CampaignAutocompleteComponent) campaignAutocompleteRef!: CampaignAutocompleteComponent;
    @Input() setFormValueForSingleCampaign!: boolean;
    @Input() campaignForm!: UntypedFormControl;
    @Input() authkey!: string;
    @Output() fetchCampaignInProgressEmit: EventEmitter<Observable<boolean>> = new EventEmitter();
    @Output() createCampaignEmitter: EventEmitter<any> = new EventEmitter();
    @Output() campaignSelected = new EventEmitter<any>();

    constructor( private cdr: ChangeDetectorRef,
                 private store: Store   
    ) 
    {
        super();
        //  this.campaignFields$ = this.store.pipe(select(getCampaignFields),distinctUntilChanged(isEqual),takeUntil(this.destroy$))
    }
    
    ngOnInit(): void {
        this.params = {
            pageNo: 1,
            itemsPerPage: 25,
        };

        if (!this.campaignForm.value) {

        } else {
            this.fetchCampaign(this.params,this.authkey);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['authkey'] && this.authkey) {
          this.params.pageNo = 1;
          this.fetchCampaign(this.params, this.authkey);
        }
      }

    public fetchNextCampaignPage(): void {
        console.log("hello")
        this.campaigns$.pipe(take(1)).subscribe((res) => {
            if (res.length === this.params.itemsPerPage * this.params.pageNo) {
                this.params.pageNo += 1;
                this.fetchCampaign(this.params, this.authkey,true);
            }
        });
    }

    public fetchCampaign(params: any, authkey:string, nextPage?: boolean): void {
       
        this.fetchCampaignInProgressEmit.emit(of(true));
        this.apiInProgress$ = of(true);
        this.service.getAllCampaignFlowFromApi(params,authkey)?.subscribe(
            (response: any) => {
                let campaigns;
                if (nextPage) {
                    this.campaigns$.pipe(take(1)).subscribe((campaign:any) => {
                        campaign.push(...response.data.data);
                        campaigns = campaign;
                        this.campaigns$ = of(campaign);
                    });
                } else {
                    this.campaigns$ = of(response.data.data);
                    // select first if there is only one campaign in list
                    if (this.setFormValueForSingleCampaign && !params?.name && response.data.data.length === 1) {
                        this.campaignForm.setValue(response.data?.data?.[0] ?? '');
                    }
                    // redirect to step second if there is no campaign in list.
                    if (
                        response.data.data.length === 0 &&
                        this.createCampaignEmitter.observed &&
                        !this.params?.name?.length
                    ) {
                        // this.autocompleteTrigger?.closePanel();
                        this.createCampaignEmitter.emit(false);
                    }
                    campaigns = response.data.data;
                }
                /**
                 * we are storing ref of validationFn function because on time of
                 * remove removeValidators function need same ref of validationFn
                 */
                // this.ValidatorFnRef = this.getValidationElementExist();
                // this.campaignForm?.setValidators([Validators.required, this.ValidatorFnRef]);
                // CustomValidators.elementExistsInList(
                //     campaigns.map((obj) => obj.id),
                //     'id'
                // ),
                this.campaignForm.updateValueAndValidity();
                this.fetchCampaignInProgressEmit.emit(of(false));
                this.apiInProgress$ = of(false);
                this.cdr.detectChanges();
            },
            (errors: any) => {
                this.fetchCampaignInProgressEmit.emit(of(false));
                this.apiInProgress$ = of(false);
            }
        );
    }

    public campaignDisplayFunction(campaign: ISegmentGetAllCampaignReqModel): any {
        return campaign?.name;
    }

    public onCampaignSelected(event: MatAutocompleteSelectedEvent): void {
        const selectedCampaign = event.option.value;
        this.campaignSelected.emit(selectedCampaign);
      }
}