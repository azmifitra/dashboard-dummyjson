import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ProductState {
  limit: number;
  skip: number;
  search: string;
  filterActive: string;
  filterBy: string;
  filterValue: string;
}

const initialState: ProductState = {
  limit: 10,
  skip: 0,
  search: '',
  filterActive: 'search',
  filterBy: '',
  filterValue: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    incrementLimit: (state) => {
      state.limit += 1;
    },
    decrementLimit: (state) => {
      state.limit -= 1;
    },
    incrementSkip: (state) => {
      state.skip += 10;
    },
    decrementSkip: (state) => {
      state.skip -= 10;
    },
    resetLimitSkip: (state) => {
      state.skip = 0
      state.limit = 10
    },
    selectActiveFilter: (state, action) => {
      state.filterActive = action.payload;
      state.search = '';
      state.filterBy = '';
      state.filterValue = '';
    },
    filterProduct: (state, action) => {
      state.filterBy = action.payload.filterBy;
      state.filterValue = action.payload.filterValue;
    },
  },
  extraReducers(builder) {},
});

// Action creators are generated for each case reducer function
export const { incrementLimit, decrementLimit, incrementSkip, decrementSkip, selectActiveFilter, filterProduct, resetLimitSkip } = productSlice.actions;

export default productSlice.reducer;
