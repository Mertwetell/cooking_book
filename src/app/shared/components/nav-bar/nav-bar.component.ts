import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private authService: AuthService,  private router: Router){
  
  }
  logout(){
    this.authService.logOut();
    this.router.navigate(['/', 'auth'])
  }
}
