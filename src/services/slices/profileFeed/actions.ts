import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProfileFeedThunk = createAsyncThunk(
  'profileFeed/fetch',
  getOrdersApi
);
