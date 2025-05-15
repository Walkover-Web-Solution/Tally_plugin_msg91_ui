import { Component } from '@angular/core';
import {Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-app';

  constructor(private router:Router) {}

  ngOnInit() {
      // const token = localStorage.getItem('proxy_auth_token') && sessionStorage.getItem('proxy_auth_token');
      // if(!token) {
      //       this.router.navigate(['/login'])
      // }
  }
}
