import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from './cart.service';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';

@Injectable()
export class OrderService {

  constructor(private router: Router,
              private cartService: CartService,
              private authService: AuthService,
              private toastrService: ToastrService,
              private http: HttpClient) { }

  submitOrder(address) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const products = this.cartService.getAllCartItemsRaw();
    const userRaw = this.authService.getUser();
    const user = {
      id: userRaw._id,
      name: userRaw.name,
    }
    const orderData = {user, products, address};

    this.http.post(`${environment.api}/orders`, orderData, httpOptions).subscribe((result) => {
      this.toastrService.success('Your order has been successfully submitted.');
      this.router.navigate(['/order-completed']);
    }, (error) => {
      this.toastrService.error(error.error);
    });
  }
}
