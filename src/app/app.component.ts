import { Component } from '@angular/core';
import {Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { PrimeNgToastComponent } from '../libs/ui/prime-ng-toast/prime-ng-toast.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            PrimeNgToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-app';

  constructor() {}

}
