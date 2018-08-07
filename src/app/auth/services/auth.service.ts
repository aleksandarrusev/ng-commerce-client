import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {IUser} from '../models/user.model';
import {environment} from '../../../environments/environment';
import {httpOptions} from '../../shared/httpOptions';
import {tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {ILoginRequest} from '../models/login-request.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public authStateSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(this.getTokenData());

    constructor(private router: Router,
                private http: HttpClient,
                private toastrService: ToastrService,
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
            tap((response: { token: String, user: IUser }) => {
                const {user, token} = response;
                this.setToken(token);
                this.authStateSubject.next(user);
            })
        );
    }

    login(loginRequest: ILoginRequest): Observable<any> {
        const userCredentials = {
            email: loginRequest.userCredentials.email,
            password: loginRequest.userCredentials.password,
        }

        return this.http.post(`${environment.api}/auth`, userCredentials)
            .pipe(
                tap((response: { token: String, user: IUser }) => {
                    const {user, token} = response;
                    this.setToken(token);

                    this.toastrService.success('LoginAction succesfull.');
                    this.router.navigateByUrl(loginRequest.returnUrl);

                })
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

    getTokenData(): IUser {
        const token = this.getToken();
        if (this.jwtService.isTokenExpired(token)) {
            return this.jwtService.decodeToken(token);
        }
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
