import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IUser} from '../user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(value) {
    this.authService.register(value.name, value.email, value.password).subscribe(
      (response: { token: String, user: IUser }) => {
        const {user, token} = response;
        this.authService.setToken(token);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
