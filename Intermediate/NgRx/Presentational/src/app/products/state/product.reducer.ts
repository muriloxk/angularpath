import {  on, createReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../product';
import * as ProductsAction from './product.action';
import * as AppState from '../../state/app.state';

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

export interface State extends AppState.State {
    products: ProductState;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
};

/**
 * SELECTORS, 
 * 
 * 1. Primeiro você cria um feature selector
 * 2. Você cria selectors para as propriedades do slice.
 */

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);


//Exemplo de selectors compostos. 
    
export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {

        if (currentProductId === 0) {
          return {
            id: 0,
            productName: '',
            productCode: 'New',
            description: '',
            starRating: 0
          };
        } else {
          return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
      }
);


export const productReducer = createReducer(
    initialState,
    on(ProductsAction.toggleProductCode, (state): ProductState => {
        console.log('Original state: ' + JSON.stringify(state));
        
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),

    on(ProductsAction.setCurrentProduct, (state, action): ProductState => {
        
        console.log('SetCurrentProduct: ', action);

        return {
            ...state,
            currentProductId: action.productId
        };
    }),

    on(ProductsAction.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        }
    }),

    on(ProductsAction.initCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        }
    }),

   on(ProductsAction.createProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: [...state.products, action.product],
            currentProductId: action.product.id,
            error: ''
        }
   }),

   on(ProductsAction.createProductFailure, (state, action): ProductState => {
       return {
           ...state,
           error: action.error
       };
   }),


   on(ProductsAction.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(
            item => action.product.id === item.id ? action.product : item);

        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: ''
        }
    }),

    on(ProductsAction.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    }),

    on(ProductsAction.deleteProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: state.products.filter(product => product.id !== action.productId),
            currentProductId: null,
            error: ''
        }
    }),

    on(ProductsAction.deleteProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    }),

    on(ProductsAction.loadProductsSucess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        }
    }),

    
    on(ProductsAction.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        }
    })
);