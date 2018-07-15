import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, first} from 'rxjs/operators';
import {CartService} from '../services/cart.service';

@Injectable()
export class CartValidatedGuardService implements CanActivate {

  constructor(public cartService: CartService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.cartService.cartValidated$.pipe(
      map((result: number) => {
        if (result) {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      }),
      first()
    );
    }

}
