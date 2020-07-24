import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../product';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  @Input() selectedProduct: Product;
  @Input() displayCode: boolean;
  @Input() products: Product[];
  @Input() errorMessage: string;

  @Output() toggleProductCode = new EventEmitter<boolean>();
  @Output() initCurrentProduct = new EventEmitter();
  @Output() setCurrentProduct = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  checkChanged(): void {
    this.toggleProductCode.emit(!this.displayCode);
  }

  newProduct(): void {
    this.initCurrentProduct.emit();
  }

  productSelected(product: Product): void {
    this.setCurrentProduct.emit(product.id);
  }
}
