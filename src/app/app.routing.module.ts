import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CartPage} from './cart/pages/cart/cart.page';
import {NotFoundComponent} from './core/not-found/not-found.component';
import {HomeComponent} from './core/home/home.component';


const routes: Route[] = [
    {path: '', component: HomeComponent},
    {path: 'cart', component: CartPage},
    {path: '**', component: NotFoundComponent},
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
