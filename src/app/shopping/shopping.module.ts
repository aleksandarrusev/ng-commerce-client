import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryComponent } from './category/category.component';
import {CartComponent} from './cart/cart.component';
import {FormsModule} from '@angular/forms';
import {ProductCardComponent} from './product/product-card/product-card.component';
import {CreateProductComponent} from './product/create-product/create-product.component';
import { SingleProductComponent } from './product/single-product/single-product.component';
// import {CoreRoutingModule} from '../core/core-routing.module';
import {CheckoutComponent} from './checkout/checkout.component';
import { OrderCompletedComponent } from './order-completed/order-completed.component';
import {ShoppingRoutingModule} from './shopping.routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShoppingRoutingModule,
    SharedModule,
  ],
  declarations: [
    CategoryComponent,
    CartComponent,
    CreateProductComponent,
    SingleProductComponent,
    CheckoutComponent,
    OrderCompletedComponent,
  ]
})
export class ShoppingModule { }
