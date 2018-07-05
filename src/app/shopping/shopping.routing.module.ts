import { NgModule } from '@angular/core';
import { Route, RouterModule} from '@angular/router';
import {CategoryComponent} from './category/category.component';
import {SingleProductComponent} from './product/single-product/single-product.component';
import {OrderCompletedComponent} from './order-completed/order-completed.component';
import {CartComponent} from './cart/cart.component';
import {CartValidatedGuardService} from './cart-validated.guard.service';
import {OrderCompletedGuard} from './order-completed/order-completed.guard';
import {CreateProductComponent} from './product/create-product/create-product.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {AuthGuardService} from '../auth/auth-guard.service';
import {AdminGuardService} from '../auth/admin-guard.service';


const routes: Route[] = [
  {path: 'cart', component: CartComponent},
  {path: 'product/add', component: CreateProductComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService, CartValidatedGuardService]},
  {path: 'category/:category-name', component: CategoryComponent},
  {path: 'product/:product-id', component: SingleProductComponent},
  {path: 'order-completed', component: OrderCompletedComponent, canActivate: [AuthGuardService, CartValidatedGuardService, OrderCompletedGuard]},
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
export class ShoppingRoutingModule { }
