import { NgModule } from '@angular/core';
import { Route, RouterModule} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {CartComponent} from './shopping/cart/cart.component';
import {LoginComponent} from './auth/login/login.component';
import {CategoryComponent} from './shopping/category/category.component';
import {CreateProductComponent} from './shopping/product/create-product/create-product.component';
import {RegisterComponent} from './auth/register/register.component';
import {SingleProductComponent} from './shopping/product/single-product/single-product.component';
import {CheckoutComponent} from './shopping/checkout/checkout.component';
import {OrderCompletedComponent} from './shopping/order-completed/order-completed.component';
import {CartValidatedGuardService} from './shopping/cart-validated.guard.service';
import {OrderCompletedGuard} from './shopping/order-completed/order-completed.guard';
import {AuthGuardService} from './auth/auth-guard.service';
import {NotFoundComponent} from './core/not-found/not-found.component';


const routes: Route[] = [
  { path: '**',  component: NotFoundComponent },
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
export class AppRoutingModule { }
