import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {UserProfile} from '../../model/user-profile';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  private userProfile: UserProfile;
  private oldUserProfile: UserProfile;

  updatedSuccess = false;
  updatedError = false;

  firstNamePresent = true;
  lastNamePresent = true;
  emailPresent = true;
  emailValid = true;

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + sessionStorage.getItem('token')
    });

    const options = { headers };

    this.http.get(environment.restUrl + '/userProfile', options).subscribe((user: UserProfile) => {
      this.userProfile = user;
      this.oldUserProfile = Object.assign({}, user);
    });

  }

  update() {
    if (!this.validateRequiredFields()) {
      return;
    }
    const headers: HttpHeaders = new HttpHeaders({
       Authorization: 'Basic ' + sessionStorage.getItem('token'),
       'Content-Type': 'application/json'
     });

    const options = {headers};
    console.log('options from update:  ' + sessionStorage.getItem('token'));
    this.http.put(environment.restUrl + '/userProfile', JSON.stringify(this.userProfile), options).subscribe((user: UserProfile) => {
       if (user) {
         this.userProfile = Object.assign({}, user);
         this.oldUserProfile = Object.assign({}, user);
         this.updatedSuccess = true;
         this.updatedError = false;
       }
     }, error =>  {
        this.updatedSuccess = false;
        this.updatedError = true;
    });
  }

  reset() {
    this.userProfile = Object.assign({}, this.oldUserProfile);
    this.updatedSuccess = false;
    this.updatedError = false;
    this.firstNamePresent = true;
    this.lastNamePresent = true;
    this.emailPresent = true;
  }

  validateRequiredFields() {
    if (!this.userProfile.firstName) {
      this.firstNamePresent = false;
    } else {
      this.firstNamePresent = true;
    }
    if (!this.userProfile.lastName) {
      this.lastNamePresent = false;
    } else {
      this.lastNamePresent = true;
    }
    if (!this.userProfile.email) {
      this.emailPresent = false;
    } else {
      this.emailPresent = true;
    }
    if (!this.validateEmail(this.userProfile.email)) {
      this.emailValid = false;
    } else {
      this.emailValid = true;
    }
    return this.firstNamePresent && this.lastNamePresent && this.emailPresent && this.emailValid;
  }

  validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);

  }
}
