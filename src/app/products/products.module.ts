import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {CategoryComponent} from './pages/category/category.component';
import {CreateProductComponent} from './pages/create-product/create-product.component';
import {SingleProductComponent} from './pages/single-product/single-product.component';
import {ProductsRoutingModule} from './products.routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ProductsRoutingModule
    ],
    declarations: [
        CategoryComponent,
        CreateProductComponent,
        SingleProductComponent,
    ],
})
export class ProductsModule {
}
