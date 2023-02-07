import { createSlice } from '@reduxjs/toolkit';

export interface CartState {
  limit: number;
  skip: number;
}

const initialState: CartState = {
  limit: 10,
  skip: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
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
  },
  extraReducers(builder) {},
});

export const { incrementLimit, decrementLimit, incrementSkip, decrementSkip } = cartSlice.actions;

export default cartSlice.reducer;
