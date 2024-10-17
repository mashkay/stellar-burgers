import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchProfileFeedThunk } from './actions';
import { auth } from '@slices';

export interface ProfileFeedState {
  orders: TOrder[];
  error: string | null;
}

const initialState: ProfileFeedState = {
  orders: [],
  error: null
};

const profileFeedSlice = createSlice({
  name: 'profileFeed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state: ProfileFeedState) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileFeedThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchProfileFeedThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch profile feed';
      })
      // очистка при логауте
      .addCase(auth.logoutThunk.fulfilled, (state) => {
        state.orders = initialState.orders;
        state.error = initialState.error;
      });
  }
});

export default profileFeedSlice;

export const {} = profileFeedSlice.actions;
export const { selectOrders } = profileFeedSlice.selectors;
