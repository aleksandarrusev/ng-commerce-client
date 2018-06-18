import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$: Observable<firebase.User>;
  private userDetails: firebase.User;

  constructor (private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user$ = firebaseAuth.authState;

    this.user$.subscribe((user) => {
      if (user) {
        this.userDetails = user;
      } else {
        this.userDetails = null;
      }
    });
  }

  isLoggedIn() {
    if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    this.firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }


  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }


}
