import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IUser} from '../user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, ValidationErrors} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  registerForm: FormGroup;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private toastrService: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.initForm();

  }

  initForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(form: FormGroup) {
    const {email, password} = form.value;
    this.authService.login(email, password).subscribe(
      () => {
        this.router.navigateByUrl(this.returnUrl);
      },
      (error) => {
        this.toastrService.error(error.error);
        this.registerForm.controls['email'].setErrors({'incorrect': true});
        this.registerForm.controls['password'].setErrors({'incorrect': true});

      }
    );
  }
}
