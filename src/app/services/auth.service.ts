import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userDetails;
  public authStatusChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isTokenAvailable());

  constructor(private router: Router, private http: HttpClient) {
  }

  isLoggedIn() {
    if (!this.isTokenAvailable()) {
      return false;
    }
    return true;
  }

  register(name: String, email: String, password: String): void {
    const user = {
      name,
      email,
      password,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.post('http://localhost:3000/api/users', user, httpOptions).subscribe(
      (response: Response) => {
        this.userDetails = response['user'];
        this.setToken(response['token']);

        this.authStatusChanged.next(true);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  login(email: String, password: String): void {
    const user = {email, password};


    this.http.post('http://localhost:3000/api/auth', user).subscribe(
      (response: Response) => {
        this.userDetails = response['user'];
        this.setToken(response['token']);

        this.authStatusChanged.next(true);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
    this.authStatusChanged.next(false);
  }

  private setToken(token) {
    localStorage.setItem('jwt_token', token);
  }

  private getToken() {
    return localStorage.getItem('jwt_token');
  }


  private isTokenAvailable() {
    return !!localStorage.getItem('jwt_token');
  }


}
