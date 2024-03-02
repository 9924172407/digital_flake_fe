import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: Product[];
}

interface Product {
  id: string;
  productName: string;
  packSize: string;
  price: number;
  categoryId: number;
  status: boolean;
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      console.log(action);
      
      state.products = action.payload.data;
    },
  },
});

export const { setProducts } = productSlice.actions;
export const getProduct = (state) => state.products.products;
export default productSlice.reducer;
