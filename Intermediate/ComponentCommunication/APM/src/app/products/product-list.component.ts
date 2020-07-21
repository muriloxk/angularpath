import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    showImage: boolean;
    imageWidth: number = 50;
    imageMargin: number = 2;
    includeDetail: boolean = true;
    parentListFilter: string;
    errorMessage: string;

    @ViewChild(CriteriaComponent) filterComponent:  CriteriaComponent;
   
    filteredProducts: IProduct[];
    products: IProduct[];

    private _listFilter: string;

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.performFilter(this.listFilter);
    }

    constructor(private productService: ProductService) { }
    
    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngAfterViewInit(): void {
        this.parentListFilter = this.filterComponent.listFilter;
    }
    onValueChange(value: string): void {
        this.performFilter(value);
    }

    // onFilterChange(filter: string): void {
    //     this.listFilter = filter;
    //     this.performFilter(this.listFilter);
    // }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
