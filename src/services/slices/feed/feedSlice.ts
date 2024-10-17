import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchFeedsThunk } from './actions';

export interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state: FeedState) => state.orders,
    selectTotal: (state: FeedState) => state.total,
    selectTotalToday: (state: FeedState) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedsThunk.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      .addCase(fetchFeedsThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch feed data';
      });
  }
});

export default feedSlice;

export const {} = feedSlice.actions;
export const { selectOrders, selectTotal, selectTotalToday } =
  feedSlice.selectors;
