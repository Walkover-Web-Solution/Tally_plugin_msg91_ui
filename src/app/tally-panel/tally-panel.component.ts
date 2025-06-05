import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { footerComponent } from '../footer/footer.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-tally-panel',
  imports: [
    MatIconModule,
    MatToolbarModule,
    footerComponent,
    MatButtonModule
  ],
  templateUrl: './tally-panel.component.html',
  styleUrls: ['./tally-panel.component.scss']
})
export class TallyPanelComponent {

  constructor(private router: Router) { }

  // Method to navigate user to the login page when called
  redirectTologin() {
    this.router.navigate(['/login'])
  }
}