//  Loader Button Directive:: START
import {
    OnInit,
    Directive,
    ElementRef,
    Input,
    OnChanges,
    Component,
    ViewContainerRef,
    SimpleChanges,
    inject,
    signal,
    effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { Platform } from '@angular/cdk/platform';
import { NgIf, NgTemplateOutlet, NgSwitch, NgSwitchCase } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

/**
 * A loader wrapper component used to display different types of buttons (flat, icon, flat-icon)
 * in a disabled state with a spinner and optional text while an operation is in progress.
 */

@Component({
    selector: 'msg91-loader-button-wrapper',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, NgIf, NgTemplateOutlet, NgSwitch, NgSwitchCase],
    template: `
        <ng-container [ngSwitch]="buttonType">
            <button *ngSwitchCase="'flat'" mat-flat-button disabled="true" [ngClass]="wrapperClass">
                <ng-container *ngTemplateOutlet="commonButtonContentTemplate"></ng-container>
            </button>
            <button *ngSwitchCase="'icon'" mat-icon-button disabled="true" [ngClass]="wrapperClass">
                <ng-container *ngTemplateOutlet="commonButtonContentTemplate"></ng-container>
            </button>
            <button
                *ngSwitchCase="'flat-icon'"
                mat-flat-button
                class="flat-icon-btn"
                disabled="true"
                [ngClass]="wrapperClass"
            >
                <ng-container *ngTemplateOutlet="commonButtonContentTemplate"></ng-container>
            </button>
        </ng-container>

        <ng-template #commonButtonContentTemplate>
            <div
                class="d-flex align-items-center justify-content-center gap-2"
                [ngStyle]="{ 'height.px': buttonStyle === 'lg' ? 40 : buttonStyle === 'md' ? 30 : 20 }"
            >
                <mat-spinner [diameter]="loaderSize" mode="indeterminate"></mat-spinner>
                <span *ngIf="buttonText">{{ buttonText }}</span>
            </div>
        </ng-template>
    `,
})
export class LoaderButtonWrapperComponent {
    public buttonText: string = "";
    public buttonStyle: 'lg' | 'md' | 'sm' = 'lg';
    public buttonType: 'flat' | 'icon' | 'flat-icon' = 'flat';
    public loaderSize: string = '24';
    public wrapperClass: string = "";
}

/**
 * Directive: LoaderButtonDirective
 * 
 * This directive replaces a standard button with a loader version when `msg91ButtonLoader` is true.
 * It hides the original button and shows the loader wrapper instead.
 */

@Directive({
    selector: '[msg91ButtonLoader]',
    standalone: true,
})
export class LoaderButtonDirective implements OnInit, OnChanges {
    @Input() public msg91ButtonLoader: boolean = false;   // Triggers the loader
    @Input() public buttonText: string = "";               // Text to show inside loader button
    @Input() public buttonStyle: 'lg' | 'md' | 'sm' = 'lg';   // Button height
    @Input() public buttonType: 'flat' | 'icon' | 'flat-icon' = 'flat';   // Button type
    @Input() public loaderSize: string = '18';                 // Spinner size
    @Input() public wrapperClass: string = "";                   // Additional CSS class

     // Used to check for platform type (for platform-specific rendering logic)
    public cdkPlatform = inject(Platform);

    constructor(private el: ElementRef, private viewContainerRef: ViewContainerRef) {}
    
     /**
     * Detects the original button type based on its class (flat, icon, etc.)
     */
    public ngOnInit(): void {
        const button = this.el.nativeElement;
        if (button.classList.contains('mat-flat-button')) {
            if (button.classList.contains('flat-icon-btn')) {
                this.buttonType = 'flat-icon';
            } else {
                this.buttonType = 'flat';
            }
        } else if (button.classList.contains('mat-icon-button')) {
            this.buttonType = 'icon';
        }
    }

      /**
     * Triggers when inputs change (esp. msg91ButtonLoader).
     * Shows/hides the loader wrapper accordingly.
     */
    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['msg91ButtonLoader']?.currentValue === changes['msg91ButtonLoader']?.previousValue) {
            return;
        }
        this.msg91ButtonLoader = changes['msg91ButtonLoader']?.currentValue;
        this.viewContainerRef.clear();
         // Avoid rendering loader on Android/iOS (optional, platform specific handling)
        if (!this.cdkPlatform.ANDROID && !this.cdkPlatform.IOS) {
            if (this.msg91ButtonLoader) {
                this.createButtonWrapper();  // Replace button with loader
            } else {
                this.el.nativeElement.setAttribute('style', 'display: block');
            }
        }
    }

     /**
     * Creates and inserts the loader wrapper component into the view,
     * hiding the original button.
     */
    private createButtonWrapper() {
        this.el.nativeElement.setAttribute('style', 'display: none');
        const componentRef = this.viewContainerRef.createComponent(LoaderButtonWrapperComponent);
        componentRef.instance.buttonText = this.buttonText;
        componentRef.instance.buttonStyle = this.buttonStyle;
        componentRef.instance.buttonType = this.buttonType;
        componentRef.instance.loaderSize = this.loaderSize;
        componentRef.instance.wrapperClass = this.wrapperClass;
    }
}