import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CategoryComponent} from '../products/pages/category/category.component';
import {SingleProductComponent} from '../products/pages/single-product/single-product.component';
import {CreateProductComponent} from '../products/pages/create-product/create-product.component';
import {AuthGuardService} from '../auth/services/auth-guard.service';
import {AdminGuardService} from '../auth/services/admin-guard.service';


const routes: Route[] = [
    {path: 'product/add', component: CreateProductComponent, canActivate: [AuthGuardService, AdminGuardService]},
    {path: 'category/:category-name', component: CategoryComponent},
    {path: 'product/:product-id', component: SingleProductComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ],

})
export class ProductsRoutingModule {
}
