import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const placeOrderThunk = createAsyncThunk(
  'order/placeOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);
