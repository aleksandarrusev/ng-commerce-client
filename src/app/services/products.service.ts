import {Product} from '../shop/product/product.model';

export class ProductsService {
  products: Product[] = [
    {
      category: 'Clothes',
      name: 'T-shirt',
      image: 'https://scene7.zumiez.com/is/image/zumiez/pdp_hero/adidas-Trefoil-White-T-Shirt-_289236-back-US.jpg'
    },
    {
      category: 'Electronics',
      name: 'Samsung Galaxy',
      image: 'https://media.tracfone.com/wps/contenthandler/dav/content/libraries/wcm.library.phones/components/STSAS120VL/wcm.comps.image/st_ecom_large_1.png'
    },
    {
      category: 'Home',
      name: 'Multicooker',
      image: 'https://cdn.technomarket.bg/media/cache/my_thumb/uploads/library/product/09146944/596f50c2a2047.jpg'
    }
  ];

  addProduct(product: Product) {
    this.products.push(product);
  }

  getAllProducts(): Product[] {
    return this.products;
  }


}
