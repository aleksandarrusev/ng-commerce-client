import { NgModule } from '@angular/core';
import { Route, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SingleProductComponent} from '../shopping/product/single-product/single-product.component';
import {OrderCompletedComponent} from '../shopping/order-completed/order-completed.component';
import {CartComponent} from '../shopping/cart/cart.component';
import {RegisterComponent} from '../auth/register/register.component';
import {CartValidatedGuardService} from '../shopping/cart-validated.guard.service';
import {CreateProductComponent} from '../shopping/product/create-product/create-product.component';
import {CheckoutComponent} from '../shopping/checkout/checkout.component';
import {CategoryComponent} from '../shopping/category/category.component';
import {OrderCompletedGuard} from '../shopping/order-completed/order-completed.guard';
import {AuthGuardService} from '../auth/auth-guard.service';
import {LoginComponent} from '../auth/login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';


const routes: Route[] = [
  {path: '', component: HomeComponent},
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
export class CoreRoutingModule { }
