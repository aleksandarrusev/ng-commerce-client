import { NgModule } from '@angular/core';
import { Route, RouterModule} from '@angular/router';
import {RegisterComponent} from '../auth/register/register.component';
import {LoginComponent} from '../auth/login/login.component';
import {GuestGuardService} from './guest-guard.service';


const routes: Route[] = [
  {path: 'login', component: LoginComponent, canActivate: [GuestGuardService]},
  {path: 'register', component: RegisterComponent, canActivate: [GuestGuardService]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
