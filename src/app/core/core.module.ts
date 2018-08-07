import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './footer/footer.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import * as fromProducts from '../products/store/products.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ProductsEffects} from '../products/store/products.effects';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        StoreModule.forFeature('products', fromProducts.productsReducer),
        EffectsModule.forFeature([ProductsEffects])
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        NotFoundComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
    ]
})
export class CoreModule {
}
