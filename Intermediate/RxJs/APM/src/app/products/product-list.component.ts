import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from './product.service';
import { catchError, map } from 'rxjs/operators';


import { Subscription, EMPTY, BehaviorSubject, combineLatest } from 'rxjs';

import { ProductCategoryService } from '../product-categories/product-category.service';
import { Product } from './product';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;
  
  selectedCategorySubject = new BehaviorSubject<number>(0);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  categories$ = this.productsCategoryService.productCategories$
                    .pipe(
                      catchError(err => {
                        this.errorMessage = err;
                        return EMPTY;
                      })
                    );

  productsSimpleFilter$ = combineLatest([ this.productService.productWithAdd$,
                                          this.selectedCategory$])
                                  .pipe(
                                    map(([products, categoryId]) => 
                                          products.filter(product =>  
                                              categoryId ? product.categoryId == categoryId : true
                                            ))
                                  );

  
  constructor(private productService: ProductService,
              private productsCategoryService: ProductCategoryService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.selectedCategorySubject.unsubscribe();
  }

  onAdd(product?: Product): void {
    this.productService.addProduct(product);
  }

  onSelected(categoryId: string): void {
    this.selectedCategorySubject.next(+categoryId);
  }
}
