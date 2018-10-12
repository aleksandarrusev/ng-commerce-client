import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartPage} from './pages/cart/cart.page';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        CartPage
    ]
})
export class CartModule {
}
