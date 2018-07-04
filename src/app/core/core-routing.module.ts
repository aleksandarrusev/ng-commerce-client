import { NgModule } from '@angular/core';
import { Route, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CartComponent} from '../shopping/cart/cart.component';
import {LoginComponent} from '../auth/login/login.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {CategoryComponent} from '../shopping/category/category.component';
import {CreateProductComponent} from '../shopping/product/create-product/create-product.component';
import {RegisterComponent} from '../auth/register/register.component';
import {SingleProductComponent} from '../shopping/product/single-product/single-product.component';


const routes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'product/add', component: CreateProductComponent, canActivate: [AuthGuardService]},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'category/:category-name', component: CategoryComponent},
  {path: 'product/:product-id', component: SingleProductComponent},

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule { }
