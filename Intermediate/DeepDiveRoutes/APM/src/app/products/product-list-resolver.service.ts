import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Product, ProductResolved, ProductsResolved } from './product';
import { ProductService } from './product.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolverService implements Resolve<ProductsResolved> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, 
          state: RouterStateSnapshot):  Observable<ProductsResolved> {

    return this.productService.getProducts()
               .pipe(
                  map(products => ({ products: products})),
                  catchError(error => {
                    const message = `Retrieval error ${error}`;
                    console.error(message);
                    return of({products: null, error: message });
                  })
               );
  }
}


