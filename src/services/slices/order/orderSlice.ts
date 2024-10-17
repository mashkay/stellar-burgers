import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { placeOrderThunk } from './actions';
import { auth } from '@slices';

export interface OrderState {
  error: string | null;
  isProcessing: boolean;
  order: TOrder | null;
  lastOrder: TOrder | null;
}

const initialState: OrderState = {
  error: null,
  isProcessing: false,
  order: null,
  lastOrder: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.error = initialState.error;
      state.order = initialState.order;
    }
  },
  selectors: {
    selectIsProcessing: (state: OrderState) => state.isProcessing,
    selectOrder: (state: OrderState) => state.order,
    selectLastOrder: (state: OrderState) => state.lastOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderThunk.pending, (state) => {
        state.error = null;
        state.isProcessing = true;
      })
      .addCase(placeOrderThunk.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.lastOrder = action.payload.order;
        state.isProcessing = false;
        state.error = null;
      })
      .addCase(placeOrderThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to place order';
        state.isProcessing = false;
      })
      // очистка при логауте
      .addCase(auth.logoutThunk.fulfilled, (state) => {
        state.error = initialState.error;
        state.isProcessing = initialState.isProcessing;
        state.order = initialState.order;
        state.lastOrder = initialState.lastOrder;
      });
  }
});

export default orderSlice;
export const { selectIsProcessing, selectOrder, selectLastOrder } =
  orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
