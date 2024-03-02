import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  categories: Category[];
}

interface Category {
  id: number;
  name: string;
  description: string;
  status: boolean;
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export const getCategory = (state) => state.categories.categories;

export default categorySlice.reducer;
