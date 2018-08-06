import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IUser} from '../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private toastrService: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register(form: FormGroup) {
    const {name, email, password} = form.value;
    this.authService.register(name, email, password ).subscribe(
      () => {
        this.toastrService.success('Registration successfull.')
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastrService.error(error.error);
        this.registerForm.controls['name'].setErrors({'incorrect': true});
        this.registerForm.controls['email'].setErrors({'incorrect': true});
        this.registerForm.controls['password'].setErrors({'incorrect': true});

      }
    );
  }

}
