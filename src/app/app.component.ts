import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent  {
  title = 'candidate-test-angular-app';

  constructor(private authService: AuthService, private router: Router) {
  }

  logout() {
    sessionStorage.setItem('token', '');
    this.authService.authenticated = false;
    this.router.navigate(['/login']);
  }

}
