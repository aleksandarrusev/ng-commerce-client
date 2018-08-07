import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {defer } from 'rxjs';
import {ProductsService} from '../services/products.service';
import {LatestProductsFetchedSuccessAction} from './products.actions';
import {map} from 'rxjs/operators';
import {IProduct} from '../models/product.model';


@Injectable()
export class ProductsEffects {

  constructor(private actions$: Actions, private productsService: ProductsService) {}

    @Effect() private _init$ = defer(() => {
        return this.productsService.fetchLatestProducts().pipe(
            map((result: IProduct[]) => {
                return new LatestProductsFetchedSuccessAction(result);
            })
        );
    });

}
