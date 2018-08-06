import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {CartService} from './services/cart.service';
import {FormsModule} from '@angular/forms';
import {ProductsService} from './services/products.service';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';
import {ShoppingModule} from './shopping/shopping.module';
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {OrderService} from './services/order.service';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {CartValidatedGuardService} from './shopping/cart-validated.guard.service';
import {TokenInterceptorService} from './auth/token-interceptor.service';
import {AppRoutingModule} from './app.routing.module';
import {GuestGuardService} from './auth/guest-guard.service';
import {AdminGuardService} from './auth/admin-guard.service';
import {ProductCardComponent} from './shopping/product/product-card/product-card.component';
import {SharedModule} from './shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './store/app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './store/app.effects';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        CoreModule,
        ShoppingModule,
        AuthModule,
        HttpClientModule,
        AppRoutingModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:3000'],
                blacklistedRoutes: []
            }
        }),
        StoreModule.forRoot(reducers, {metaReducers}),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AppEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
        }),

    ],
    providers: [
        AuthService,
        CartService,
        ProductsService,
        AuthGuardService,
        OrderService,
        JwtHelperService,
        GuestGuardService,
        AdminGuardService,
        CartValidatedGuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
