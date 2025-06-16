import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [MatIconModule,
          MatToolbarModule,
          CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  constructor(private router: Router) { }
  
      // Method to navigate user to the login page when called
    public redirectTologin() {
      this.router.navigate(['/login'])
    }
  
    public pricing() {
      // Method to navigate user to the pricing page when called
      this.router.navigate(['/pricing']);
    }
  
    public contact() {
      // Method to navigate user to the contact page when called
      this.router.navigate(['/contact']); 
    }

}
