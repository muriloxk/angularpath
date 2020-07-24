import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { State, getShowProductCode, getCurrentProduct, getProducts, getError } from '../state/product.reducer';
import * as ProductsAction from '../state/product.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  displayCode: boolean;
  sub: Subscription;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
   
    this.products$ = this.store.select(getProducts);

    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(ProductsAction.loadProducts());

    this.selectedProduct$ =  this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductsAction.toggleProductCode())
  }

  newProduct(): void {
    this.store.dispatch(ProductsAction.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductsAction.setCurrentProduct({ productId: product.id } ));
  }
}
