import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {combineLatest, defer} from 'rxjs';
import {ProductsService} from '../services/products.service';
import {
    FetchProductsByCategoryAction,
    LatestProductsFetchedSuccessAction,
    ProductsActionTypes,
    ProductsFetchedSuccessAction
} from './products.actions';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {IProduct} from '../models/product.model';
import {Router} from '@angular/router';


@Injectable()
export class ProductsEffects {

  constructor(private actions$: Actions, private productsService: ProductsService, private router: Router) {}

    @Effect() private _init$ = defer(() => {
        return this.productsService.fetchLatestProducts().pipe(
            map((result: IProduct[]) => {
                return new LatestProductsFetchedSuccessAction(result);
            })
        );
    });

    @Effect() private productsByCategory$ = this.actions$.pipe(
        ofType<FetchProductsByCategoryAction>(ProductsActionTypes.FetchProductsByCategory),
        switchMap((action) => {
            const {category, qParams} = action.payload;
            return this.productsService.fetchProductsByCategoryName(category, qParams);
        }),
        map((result: IProduct[]) => {
            return new ProductsFetchedSuccessAction(result);
        })
    );


}
