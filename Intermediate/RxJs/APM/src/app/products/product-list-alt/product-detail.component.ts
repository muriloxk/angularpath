import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { catchError } from 'rxjs/operators';
import { empty, EMPTY } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent  {
  pageTitle = 'Product Detail';
  errorMessage = '';
  
  product$ = this.productService.productSelected$
                  .pipe(
                          catchError(err => {
                            this.errorMessage = err;
                            return EMPTY; 
                        })
                  );

  productSuppliers$ = this.productService.selectedProductSuppliers$        
                        .pipe(
                          catchError(err => {
                            this.errorMessage = err;
                            return EMPTY;
                        })
);

  constructor(private productService: ProductService) { }

}
