import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-left-side-nav',
  templateUrl: './main-left-side-nav.component.html',
  styleUrls: ['./main-left-side-nav.component.css']
})
export class MainLeftSideNavComponent {
  @Input() public isSideNavOpen!: boolean;
  constructor() {
  }
}