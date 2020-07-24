import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction(
    '[Product] Toggle Product Code'
);

export const setCurrentProduct = createAction(
    '[Product] Set current product',  
    props<{ productId: number }>()
);

export const clearCurrentProduct = createAction(
    '[Product] Clear current product'
);

export const initCurrentProduct = createAction(
    '[Product] Init current product'
);

export const createProduct = createAction(
    '[Product] Create product',  
    props<{ product: Product }>()
);

export const createProductSuccess = createAction(
    '[Product] Create Product Success',
    props<{ product: Product }>()
  );

export const createProductFailure = createAction(
    '[Product] Error create product',  
    props<{ error: string }>()
);


export const updateProduct = createAction(
    '[Product] Update product',  
    props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
    '[Product] Update Product Success',
    props<{ product: Product }>()
  );

export const updateProductFailure = createAction(
    '[Product] Error Update product',  
    props<{ error: string }>()
);

export const deleteProduct = createAction(
    '[Product] Delete Product',
    props<{ productId: number }>()
  );
  
export const deleteProductSuccess = createAction(
    '[Product] Delete Product Success',
    props<{ productId: number }>()
  );
  
  export const deleteProductFailure = createAction(
    '[Product] Delete Product Fail',
    props<{ error: string }>()
  );

export const loadProducts = createAction( 
    '[Product] Load'
);

export const loadProductsSucess = createAction(
    '[Product] Load Success',
    props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
    '[Product] Load Fail',
    props<{ error: string }>()
)
