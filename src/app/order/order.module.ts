import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import { OrderCompletedComponent } from './pages/order-completed/order-completed.component';
import {OrderRoutingModule} from './order.routing.module';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {AuthEffects} from '../auth/store/auth.effects';
import * as fromShopping from '../products/store/shopping.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ShoppingEffects} from '../products/store/shopping.effects';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    SharedModule,
      // StoreModule.forFeature('shopping', fromShopping.shoppingReducer),
      // EffectsModule.forFeature([ShoppingEffects])

  ],
  declarations: [
    // CartComponent,
    CheckoutComponent,
    OrderCompletedComponent,
  ]
})
export class OrderModule { }
