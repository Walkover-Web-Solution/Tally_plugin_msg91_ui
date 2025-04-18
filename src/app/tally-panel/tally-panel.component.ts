import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { OtpEffects } from '../otp/store/effects';
import { footerComponent } from '../footer/footer.component';

@Component({
  selector: 'app-tally-panel',
  imports: [
    MatIconModule,
    MatToolbarModule,
    footerComponent
  ],
  templateUrl: './tally-panel.component.html',
  styleUrls: ['./tally-panel.component.scss']
})
export class TallyPanelComponent {
  constructor(private router: Router, private injector: Injector) {
    const effects = this.injector.get(OtpEffects, null);
    console.log('OtpEffects:', effects);
  }
  redirectTologin() {
    this.router.navigate(['/login'])
  }
}