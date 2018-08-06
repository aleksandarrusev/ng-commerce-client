import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {CartService} from '../../services/cart.service';
import {ProductsService} from '../../services/products.service';
import {ICategory} from '../../shopping/category.model';
import {IUser} from '../../auth/models/user.model';
import {Product} from '../../shopping/product/product.model';
import {FormControl} from '@angular/forms';
import {switchMap, throttleTime} from 'rxjs/operators';
import {debounceTime} from 'rxjs/internal/operators';
import {select, Store} from '@ngrx/store';
import {AuthState} from '../../auth/store/auth.reducer';
import {Logout} from '../../auth/store/auth.actions';
import {getUser} from '../../auth/store/auth.selectors';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    categories$: Observable<ICategory[]>;
    autocompleteResults: Product[];
    cartState$: Observable<any>;
    queryField: FormControl = new FormControl();
    user: IUser = null;
    showMenu = false;
    showAutocomplete = false;

    @HostListener('document:click', ['$event'])

    documentClick(event: MouseEvent) {
        this.showAutocomplete = false;
    }

    toggleCollapse() {
        this.showMenu = !this.showMenu;
    }


    constructor(private authService: AuthService,
                private cartService: CartService,
                private store: Store<AuthState>,
                private productService: ProductsService) {
    }

    logout() {
        this.store.dispatch(new Logout());
    }

    ngOnInit() {
        // this.authService.authState$.subscribe((user) => {
        //     if (user) {
        //         this.user = user;
        //         return;
        //     }
        //     this.user = null;
        // });
        this.store.pipe(
            select(getUser)
        ).subscribe((user) => {
            if (user) {
                this.user = user;
            } else {
                this.user = null;
            }
        });

        this.cartState$ = this.cartService.cartState$;

        this.categories$ = this.productService.fetchAllCategories();

        this.queryField.valueChanges.pipe(switchMap((value) => {
                return this.productService.fetchProductsForAutocomplete(value);
            }
        ), debounceTime(600)).subscribe((result) => {
            if (result && result.length >= 1) {
                this.showAutocomplete = true;
                this.autocompleteResults = result;
            } else {
                this.showAutocomplete = false;
            }
        });
    }

    emptySearchInput() {
        this.queryField.setValue('');
    }

}
