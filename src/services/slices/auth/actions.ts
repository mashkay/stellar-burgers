import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';

export const checkUserAuthThunk = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken && !refreshToken) {
      return null;
    }

    const response = await getUserApi();
    return response.user;
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookies(response.accessToken, response.refreshToken);
    return response.user;
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookies(response.accessToken, response.refreshToken);
    return response.user;
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  const response = await logoutApi();
  if (response.success) {
    clearCookies();
  }
});

export const updateUserThunk = createAsyncThunk(
  'auth/updateUser',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

const setCookies = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const clearCookies = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
};
