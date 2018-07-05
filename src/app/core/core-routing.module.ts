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
import {CheckoutComponent} from '../shopping/checkout/checkout.component';
import {OrderCompletedComponent} from '../shopping/order-completed/order-completed.component';
import {CartValidatedGuardService} from '../shopping/cart-validated.guard.service';
import {OrderCompletedGuard} from '../shopping/order-completed/order-completed.guard';


const routes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'product/add', component: CreateProductComponent, canActivate: [AuthGuardService]},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService, CartValidatedGuardService]},
  {path: 'category/:category-name', component: CategoryComponent},
  {path: 'product/:product-id', component: SingleProductComponent},
  {path: 'order-completed', component: OrderCompletedComponent, canActivate: [AuthGuardService, CartValidatedGuardService, OrderCompletedGuard]},
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
