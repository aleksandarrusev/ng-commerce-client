import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {StoreModule} from '@ngrx/store';
import * as fromCart from '../cart/store/cart.reducer';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ToastrModule.forRoot(),
        StoreModule.forFeature('cart', fromCart.cartReducer),
    ],
    declarations: [
        ProductCardComponent
    ],
    exports: [
        ProductCardComponent
    ]
})
export class SharedModule {
}
