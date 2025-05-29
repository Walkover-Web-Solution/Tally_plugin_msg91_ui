import { Component, EventEmitter, Input, Output, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CdkScrollable, ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

const DEBOUNCE_TIME = 200;

@Component({
  selector: 'msg91-cdk-scroll',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  template: `
    <div
      class="cdk-scroll-wrapper"
      cdkScrollable
      id="scrollableWrapper"
      style="overflow: auto; max-height: 300px;"
    >
      <ng-content></ng-content>
    </div>
  `,
})


export class CDKScrollComponent implements OnInit, OnDestroy {
  @ViewChild(CdkScrollable) public scrollableWrapper: CdkScrollable | undefined;

  /** Scrollable element ID, used to avoid triggering multiple events for multiple scroll instances */
  @Input() public scrollableElementId = '';

  @Output() public fetchNextPage = new EventEmitter<string>();
  @Output() public fetchFirstPage = new EventEmitter<boolean>();

  private destroy$ = new Subject<void>();

  constructor(private sd: ScrollDispatcher) {}

  ngOnInit(): void {
    this.sd
      .scrolled()
      .pipe(debounceTime(DEBOUNCE_TIME), takeUntil(this.destroy$))
      .subscribe((res) => {
        const elementId = res?.getElementRef().nativeElement.id;
        if (
          res &&
          (elementId === 'scrollableWrapper' || elementId === this.scrollableElementId)
        ) {
          const bottomOffset = res.measureScrollOffset('bottom');
          const topOffset = res.measureScrollOffset('top');

          if (bottomOffset <= 30 && topOffset) {
            this.fetchNextPage.emit(elementId);
          }

          if (topOffset === 0) {
            this.fetchFirstPage.emit(true);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
