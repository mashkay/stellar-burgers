import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredientsThunk = createAsyncThunk(
  'ingredients/get',
  getIngredientsApi
);
