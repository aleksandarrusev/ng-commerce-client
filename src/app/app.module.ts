import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {CartService} from './cart/services/cart.service';
import {FormsModule} from '@angular/forms';
import {ProductsService} from './products/services/products.service';
import {AuthService} from './auth/services/auth.service';
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {TokenInterceptorService} from './auth/services/token-interceptor.service';
import {AppRoutingModule} from './app.routing.module';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './store/app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './store/app.effects';
import {CartModule} from './cart/cart.module';
import {OrderModule} from './order/order.module';
import {AdminGuardService} from './auth/services/admin-guard.service';
import {AuthGuardService} from './auth/services/auth-guard.service';
import {GuestGuardService} from './auth/services/guest-guard.service';
import {ProductsModule} from './products/products.module';
import {CartValidatedGuardService} from './order/services/cart-validated.guard.service';
import {OrderService} from './order/services/order.service';

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
        CoreModule,
        CartModule,
        ProductsModule,
        OrderModule,
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
        JwtHelperService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
        AuthGuardService,
        AdminGuardService,
        OrderService,
        GuestGuardService,
        CartValidatedGuardService

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
