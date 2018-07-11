import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, first} from 'rxjs/operators';
import {CartService} from '../services/cart.service';

@Injectable()
export class CartValidatedGuardService implements CanActivate {

  constructor(public cartService: CartService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>|boolean {
    const cartValidated = this.cartService.cartValidated.getValue();
    if (cartValidated) {
      return true;
    }
    this.router.navigate(['/']);
    return false;

    // return this.cartService.cartValidated.pipe
    // (map(((validated) => {
    //   if (validated) {
    //     return true;
    //   } else {
    //     this.router.navigate(['/login']);
    //     return false;
    //   }
    // })), first());
  }

}
