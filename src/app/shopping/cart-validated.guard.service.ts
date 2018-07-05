import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, first} from 'rxjs/operators';
import {CartService} from '../services/cart.service';

@Injectable()
export class CartValidatedGuardService implements CanActivate {

  constructor(public cartService: CartService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.cartService.cartValidated.pipe
    (map(((validated) => {
      if (validated) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    })), first());
  }
}
