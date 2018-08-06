import {ICategory} from './category.model';

export interface IProduct {
  _id?: string;
  category: any;
  name: string;
  price: number;
  numberInStock: number;
  imageURL: string;
  description?: string;
}

export class Product implements IProduct {
  constructor(
    public _id = null,
    public name: string,
    public category: any,
    public price: number,
    public numberInStock: number,
    public imageURL: string,
    public description: string = null,
  ) {
  }
}
