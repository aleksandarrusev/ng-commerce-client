import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {AuthRoutingModule} from './auth.routing.module';
import * as fromAuth from './store/auth.reducer';
import {StoreModule} from '@ngrx/store';
import {AuthEffects} from './store/auth.effects';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
      StoreModule.forFeature('auth', fromAuth.authReducer),
      EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
