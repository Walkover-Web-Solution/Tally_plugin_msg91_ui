import { Component, Injector } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
    MatButtonModule,
    RouterModule
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

  pricing() {
    // Method to navigate user to the pricing page when called
    this.router.navigate(['/pricing']);
  }

  contact() {
    // Method to navigate user to the contact page when called
    this.router.navigate(['/contact']); 
  }

  public openPluginLink(): void {
    window.location.href = 'https://drive.google.com/drive/folders/1wG-qh38G8RRWrkyUuSnDjeYYucrPeTMM?usp=sharing';
}
}