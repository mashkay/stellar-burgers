import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginThunk, registerThunk } from './actions';

export interface AuthState {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthChecked: false,
  user: null,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
  selectors: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginThunk.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.error.message || 'login failed';
        state.isAuthChecked = true;
      })
      // Register
      .addCase(registerThunk.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.error = action.error.message || 'register failed';
        state.isAuthChecked = true;
      });
  }
});

export const { setAuthChecked, setUser, setError } = authSlice.actions;
export const {} = authSlice.selectors;
export default authSlice;
