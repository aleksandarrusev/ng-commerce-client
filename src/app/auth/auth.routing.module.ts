import { NgModule } from '@angular/core';
import { Route, RouterModule} from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {GuestGuardService} from './services/guest-guard.service';


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
