import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {IUser} from '../auth/user.model';
import {environment} from '../../environments/environment';
import {httpOptions} from '../shared/httpOptions';
import {User} from 'firebase';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStateSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(this.getTokenData());

  constructor(private router: Router,
              private http: HttpClient,
              private jwtService: JwtHelperService) {
  }

  public authState$: Observable<IUser | null> = this.authStateSubject.asObservable();

  register(name: String, email: String, password: String): Observable<any> {
    const userInput = {
      name,
      email,
      password,
    };

    return this.http.post(`${environment.api}/users`, userInput, httpOptions).pipe(
      tap((user) => this.authStateSubject.next(user))
    );
  }

  login(email: String, password: String): Observable<any> {
    const userCredentials = {email, password};

    return this.http.post(`${environment.api}/auth`, userCredentials).pipe(
      tap((user) => this.authStateSubject.next(user))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.authStateSubject.next(null);
  }

  public setToken(token) {
    localStorage.setItem('token', token);
  }


  private isAuthenticated(): boolean {
    const token = this.getToken();

    return !this.jwtService.isTokenExpired(token);
  }

  getTokenData() {
    const token = this.getToken();
    if (this.jwtService.isTokenExpired(token)) {
      return this.jwtService.decodeToken(token);
    }
    return false;
  }

  public getUser(): IUser {
    let user;
    this.authStateSubject.subscribe((userData) => {
      user = userData;
    });
    return user;
  }

  public isLoggedIn(): boolean {
    let isLoggedIn = false;
    this.authStateSubject.subscribe((user) => {
      if (user) {
        isLoggedIn = true;
      }
    });
    return isLoggedIn;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  private isTokenAvailable() {
    return !!localStorage.getItem('token');
  }

}
