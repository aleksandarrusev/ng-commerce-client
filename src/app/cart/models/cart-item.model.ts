import {IProduct} from '../../products/models/product.model';

export interface ICartItem {
  product: IProduct;
  qty: number;
}

export class CartItem implements ICartItem {
  constructor (public product: IProduct, public qty: number) {}
}
