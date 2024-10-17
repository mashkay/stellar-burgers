import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFeedsThunk = createAsyncThunk('feed/fetch', async () => {
  const response = await getFeedsApi();
  return response;
});
