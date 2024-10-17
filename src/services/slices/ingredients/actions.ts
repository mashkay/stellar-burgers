import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredientsThunk = createAsyncThunk(
  'ingredients/get',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);
