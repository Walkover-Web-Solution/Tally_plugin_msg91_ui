import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TallyPanelComponent } from './tally-panel/tally-panel.component';


@Component({
  selector: 'app-root',
  imports: [TallyPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-app';
}
