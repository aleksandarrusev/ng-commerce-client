import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import { OrderCompletedComponent } from './pages/order-completed/order-completed.component';
import {OrderRoutingModule} from './order.routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    CheckoutComponent,
    OrderCompletedComponent,
  ]
})
export class OrderModule { }
