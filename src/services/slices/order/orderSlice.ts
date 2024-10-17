import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { placeOrderThunk } from './actions';
import { clear } from 'console';

export interface OrderState {
  error: string | null;
  isProcessing: boolean;
  order: TOrder | null;
}

const initialState: OrderState = {
  error: null,
  isProcessing: false,
  order: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.error = initialState.error;
      state.isProcessing = initialState.isProcessing;
      state.order = initialState.order;
    }
  },
  selectors: {
    selectIsProcessing: (state: OrderState) => state.isProcessing,
    selectOrder: (state: OrderState) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderThunk.pending, (state) => {
        state.error = null;
        state.isProcessing = true;
      })
      .addCase(placeOrderThunk.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isProcessing = false;
        state.error = null;
      })
      .addCase(placeOrderThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to place order';
        state.isProcessing = false;
      });
  }
});

export default orderSlice;
export const { selectIsProcessing, selectOrder } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
