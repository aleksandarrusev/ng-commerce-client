import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from './cart.service';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {httpOptions} from '../shared/httpOptions';
import {tap, catchError} from 'rxjs/operators';

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
    const products = this.cartService.getAllCartItemsRaw();
    const userRaw = this.authService.getUser();
    const user = {
      id: userRaw._id,
      name: userRaw.name,
    };
    const orderData = {user, products, address};

    return this.http.post(`${environment.api}/orders`, orderData, httpOptions).pipe(
      tap((result) => {
        this.orderCompleted.next(result);
      }));
  }
}
