import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService {

  authenticated = false;

  constructor(private http: HttpClient) { }

  authenticate(credentials, callback) {
    this.http.post<Observable<boolean>>(environment.restUrl + '/login', {username: credentials.username, password: credentials.password}).subscribe( response => {
      if (response) {
        this.authenticated = true;
        sessionStorage.setItem('token', btoa(credentials.username + ':' + credentials.password));
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });
  }
}
