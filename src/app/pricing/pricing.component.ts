import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pricing',
  imports: [MatCardModule,
            MatButtonModule,
            MatToolbarModule,
            MatIconModule,
            CommonModule
  ],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  
  public activeLink: string = 'pricing'; // Default active link

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

  public setActiveLink(link: string): void {
    this.activeLink = link;
}
}
