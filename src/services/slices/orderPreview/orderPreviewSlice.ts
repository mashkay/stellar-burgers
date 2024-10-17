import { createSelector, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberThunk } from './actions';

export interface OrderPreviewState {
  order: TOrder | null;
  isLoading: boolean;
  pendingOrderNumber: number | null;
}

const initialState: OrderPreviewState = {
  order: null,
  isLoading: false,
  pendingOrderNumber: null
};

const orderPreviewSlice = createSlice({
  name: 'orderPreview',
  initialState,
  reducers: {},
  selectors: {
    selectOrder: (state: OrderPreviewState) => state.order,
    selectIsLoading: (state: OrderPreviewState) => state.isLoading,
    selectIsOrderFetched: createSelector(
      [
        (_: OrderPreviewState, orderNumber: number) => orderNumber,
        (state: OrderPreviewState) => state.pendingOrderNumber,
        (state: OrderPreviewState) => state.isLoading
      ],
      (orderNumber, lastFetched, isLoading) =>
        lastFetched === orderNumber && !isLoading
    )
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumberThunk.pending, (state, arg) => {
        state.isLoading = true;
        state.pendingOrderNumber = arg.meta.arg;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      });
  }
});

export const {} = orderPreviewSlice.actions;
export const { selectIsLoading, selectOrder, selectIsOrderFetched } =
  orderPreviewSlice.selectors;

export default orderPreviewSlice;
