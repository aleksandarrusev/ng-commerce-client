import {UrlTree} from '@angular/router';

export interface ILoginRequest {
  userCredentials: {
      email: string;
      password: string;
  };
  returnUrl: UrlTree;
}
