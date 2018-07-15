import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IUser} from '../user.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  login(value) {
    this.authService.login(value.email, value.password).subscribe(
      (response: { token: String, user: IUser }) => {
        const {user, token} = response;
        this.authService.setToken(token);
        this.router.navigateByUrl(this.returnUrl);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
