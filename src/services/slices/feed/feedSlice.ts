import { createSelector, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchFeedsThunk } from './actions';

export interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
  isLoading: boolean;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  isLoading: false
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state: FeedState) => state.orders,
    selectTotal: (state: FeedState) => state.total,
    selectIsLoading: (state: FeedState) => state.isLoading,
    selectTotalToday: (state: FeedState) => state.totalToday,
    selectOrdersDone: createSelector(
      (state: FeedState) => state.orders,
      (orders) =>
        orders
          .filter((order) => order.status === 'done')
          .map((item) => item.number)
          .slice(0, 20)
    ),
    selectOrdersPending: createSelector(
      (state: FeedState) => state.orders,
      (orders) =>
        orders
          .filter((order) => order.status === 'pending')
          .map((item) => item.number)
          .slice(0, 20)
    )
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedsThunk.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(fetchFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedsThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch feed data';
        state.isLoading = false;
      });
  }
});

export default feedSlice;

export const {} = feedSlice.actions;
export const {
  selectOrders,
  selectTotal,
  selectTotalToday,
  selectIsLoading,
  selectOrdersDone,
  selectOrdersPending
} = feedSlice.selectors;
