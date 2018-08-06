import { NgModule } from '@angular/core';
import { Route, RouterModule} from '@angular/router';
import {OrderCompletedComponent} from './pages/order-completed/order-completed.component';
import {CartValidatedGuardService} from './services/cart-validated.guard.service';
import {OrderCompletedGuard} from './pages/order-completed/order-completed.guard';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {AuthGuardService} from '../auth/services/auth-guard.service';

const routes: Route[] = [
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService, CartValidatedGuardService]},
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
export class OrderRoutingModule { }
