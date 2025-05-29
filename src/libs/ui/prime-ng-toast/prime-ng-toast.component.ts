import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { errorResolver } from '../../../app/models/root-models';
import { BaseComponent } from '../base-component/base.component';
import { isEqual } from 'lodash-es';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { MatTooltipModule } from '@angular/material/tooltip';
// import material from '@primeng/themes/material';
import { distinctUntilChanged, Observable, takeUntil } from 'rxjs';
import { PrimeNgToastService } from '../../prime-ng-toast.service';

@Component({
    selector: 'msg91-prime-ng-toast',
    templateUrl: './prime-ng-toast.component.html',
    styleUrls: ['./prime-ng-toast.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ToastModule,
        RippleModule,
        ButtonModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule
    ],
    providers: [
        MessageService,
        PrimeNgToastService,
    ]
})
export class PrimeNgToastComponent extends BaseComponent implements OnInit, OnDestroy {
    @Output() public customAction = new EventEmitter<any>();

    public undoTimer$:Observable<any>

    private toastDefaultSetting = {
        summary: '',
        life: 3000,
        closable: false,
    };

    constructor(
        private messageService: MessageService,
        private primeNgToastService: PrimeNgToastService
    ) {
        super();
        this.undoTimer$ = this.primeNgToastService.undoTimer$;
    }

    public ngOnInit(): void {
        this.primeNgToastService.success$
            .pipe(distinctUntilChanged(isEqual), takeUntil(this.destroy$))
            .subscribe((res) => {
                if (res) {
                    this.showSuccess(res.message, res.options);
                    this.primeNgToastService.success$.next(null);
                }
            });

        this.primeNgToastService.error$
            .pipe(distinctUntilChanged(isEqual), takeUntil(this.destroy$))
            .subscribe((res) => {
                if (res) {
                    this.showError(res.message, res.options);
                    this.primeNgToastService.error$.next(null);
                }
            });

        this.primeNgToastService.warn$
            .pipe(distinctUntilChanged(isEqual), takeUntil(this.destroy$))
            .subscribe((res) => {
                if (res) {
                    this.showWarn(res.message, res.options);
                    this.primeNgToastService.warn$.next(null);
                }
            });

        this.primeNgToastService.info$
            .pipe(distinctUntilChanged(isEqual), takeUntil(this.destroy$))
            .subscribe((res) => {
                if (res) {
                    this.showInfo(res.message, res.options);
                    this.primeNgToastService.info$.next(null);
                }
            });

        this.primeNgToastService.action$
            .pipe(distinctUntilChanged(isEqual), takeUntil(this.destroy$))
            .subscribe((res) => {
                if (res) {
                    this.showAction(res.message, res.options, res.buttonContent);
                    this.primeNgToastService.action$.next(null);
                }
            });

        this.primeNgToastService.clearActionToast$
            .pipe(distinctUntilChanged(isEqual), takeUntil(this.destroy$))
            .subscribe((res) => {
                if (res) {
                    if (typeof res === 'string') {
                        this.messageService.clear(res);
                    } else {
                        this.messageService.clear();
                    }
                    this.primeNgToastService.clearActionToast$.next(false);
                }
            });
    }

    // public ngOnDestroy(): void {
    //     super.ngOnDestroy();
    // }

    public showSuccess(message:any, options:any): void {
        this.messageService.add({
            ...this.toastDefaultSetting,
            severity: 'success',
            detail: this.makeDetails(options, message),
            ...options,
        });
    }

    public showError(message:any, options:any): void {
        this.messageService.add({
            ...this.toastDefaultSetting,
            severity: 'error',
            detail: this.makeDetails(options, message),
            life: 5000,
            ...options,
        });
    }

    public showWarn(message:any, options:any): void {
        this.messageService.add({
            ...this.toastDefaultSetting,
            severity: 'warn',
            detail: this.makeDetails(options, message),
            ...options,
        });
    }

    public showInfo(message:any, options:any): void {
        this.messageService.add({
            ...this.toastDefaultSetting,
            severity: 'info',
            detail: this.makeDetails(options, message),
            ...options,
        });
    }

    public showAction(message:any, options:any, buttonContent:any): void {
        this.messageService.clear('customAction');
        this.messageService.add({
            ...this.toastDefaultSetting,
            severity: 'success',
            key: 'customAction',
            detail: {
                message: this.makeDetails(options, message),
                buttonContent,
            },
            closable: false,
            ...options,
        });
    }

    public onCustomActionClick(message:any) {
        this.messageService.clear('customAction');
        this.customAction.emit(message?.detail);
    }

    public closeToast() {
        this.messageService.clear();
    }

    private makeDetails(message:any, options:any): string | string[] {
        return options?.removeTextDecoration
            ? errorResolver(message)
            : errorResolver(message)[0]?.charAt(0)?.toUpperCase() + errorResolver(message)[0]?.slice(1)?.toLowerCase();
    }
}
