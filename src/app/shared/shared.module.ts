import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ToastrModule.forRoot(),


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
