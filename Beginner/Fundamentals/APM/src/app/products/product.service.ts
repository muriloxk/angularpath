import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProduct } from './product';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productUrl = 'http://localhost:3000/products';

    constructor(private http: HttpClient) { }
 
    getProducts() : Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl)
                        .pipe(
                            tap(data => console.log('All: ' + JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    private handleError(err: HttpErrorResponse) {
        // In a real world app, we may send the server to some remote logging insfrastructure
        // instead of just logging in to the console
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) {
            // A client-side or network error occured. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else { 
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
        }
        
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}