import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../cart/services/cart.service';
import {AuthService} from '../../auth/services/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, combineLatest, forkJoin, Observable} from 'rxjs';
import {httpOptions} from '../../shared/httpOptions';
import {tap, catchError, map, mergeMap, switchMap, first, withLatestFrom,} from 'rxjs/operators';
import {IUser} from '../../auth/models/user.model';

@Injectable()
export class OrderService {
    orderCompleted: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private router: Router,
                private cartService: CartService,
                private authService: AuthService,
                private toastrService: ToastrService,
                private http: HttpClient) {
    }

    submitOrder(address) {
        const orderData = {user: null, products: null, address};

        this.authService.getUserSimple().pipe(
            withLatestFrom(this.cartService.getAllCartItemsSimple()),
        ).subscribe(([user, products]) => {
            orderData.user = user;
            orderData.products = products;
        });

        return this.http.post(`${environment.api}/orders`, orderData, httpOptions).pipe(
            tap((result) => {
                console.log('ORDER')
                this.orderCompleted.next(result);
            }),
        );
    }
}
