import { BrowserModule } from '@angular/platform-browser';
import { RouterModule  } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './shop/product/product.component';
import {CommonModule} from '@angular/common';
import {CartService} from './services/cart.service';
import { CreateProductComponent } from './shop/product/create-product/create-product.component';
import {FormsModule} from '@angular/forms';
import {ProductsService} from './services/products.service';
import { AuthService} from './services/auth.service';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ShopComponent,
    CartComponent,
    ProductComponent,
    CreateProductComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'shop', component: ShopComponent},
      {path: 'cart', component: CartComponent},
      {path: 'product/add', component: CreateProductComponent},
    ])
  ],
  providers: [
    CartService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
