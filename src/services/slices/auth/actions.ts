import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { setAuthChecked, setError, setUser } from './authSlice';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';

export const checkUserAuthThunk = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken && !refreshToken) {
      dispatch(setUser(null));
      dispatch(setError(null));
    } else {
      getUserApi()
        .then((response) => {
          dispatch(setUser(response.user));
        })
        .catch((error) => {
          dispatch(setError(error.message));
          dispatch(setUser(null));
        });
    }
    dispatch(setAuthChecked(true));
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

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    const response = await logoutApi();
    if (response.success) {
      clearCookies();
      dispatch(setUser(null));
      dispatch(setError(null));
    }
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
