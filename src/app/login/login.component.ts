import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {error} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit{

  errorMessage;
  credentials = {username: '', password: ''};

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.authenticate(this.credentials, () => {
      if (this.authService.authenticated) {
        this.router.navigateByUrl('profile');
        this.errorMessage = null;
      } else {
        this.errorMessage = 'Login failed!';
      }

    });
    return false;
  }



}
