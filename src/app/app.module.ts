import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {CartService} from './services/cart.service';
import {FormsModule} from '@angular/forms';
import {ProductsService} from './services/products.service';
import { AuthService} from './services/auth.service';
import { environment } from '../environments/environment';
import {AuthGuardService} from './services/auth-guard.service';
import {ShoppingModule} from './shopping/shopping.module';
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {OrderService} from './services/order.service';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CoreModule,
    ShoppingModule,
    AuthModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [
    AuthService,
    CartService,
    ProductsService,
    AuthGuardService,
    OrderService,
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
