import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFeedsThunk = createAsyncThunk('feed/fetch', getFeedsApi);
