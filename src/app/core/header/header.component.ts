import {Component, HostListener, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/services/auth.service';
import {CartService} from '../../cart/services/cart.service';
import {ProductsService} from '../../products/services/products.service';
import {ICategory} from '../../products/models/category.model';
import {IUser} from '../../auth/models/user.model';
import {Product} from '../../products/models/product.model';
import {FormControl} from '@angular/forms';
import {switchMap, throttleTime} from 'rxjs/operators';
import {debounceTime} from 'rxjs/internal/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    categories$: Observable<ICategory[]>;
    autocompleteResults: Product[];
    cartItemsCount$: Observable<number>;
    queryField: FormControl = new FormControl();
    user$: Observable<IUser>;
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
                private productService: ProductsService) {
    }

    logout() {
        this.authService.logout();
    }

    ngOnInit() {
        this.user$ = this.authService.getUser();

        this.categories$ = this.productService.fetchAllCategories();

        this.queryField.valueChanges.pipe(
            switchMap((value) => {
                    return this.productService.fetchProductsForAutocomplete(value);
                }
            ),
            debounceTime(600)).subscribe((result) => {
            if (result && result.length >= 1) {
                this.showAutocomplete = true;
                this.autocompleteResults = result;
            } else {
                this.showAutocomplete = false;
            }
        });

        this.cartItemsCount$ = this.cartService.getCartItemsCount();

    }

    emptySearchInput() {
        this.queryField.setValue('');
    }

}
