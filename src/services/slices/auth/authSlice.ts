import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  checkUserAuthThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  updateUserThunk
} from './actions';

export interface AuthState {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthChecked: false,
  user: null,
  error: null
};

const authSlice = createSlice({
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
  selectors: {
    selectIsAuthChecked: (state: AuthState) => state.isAuthChecked,
    selectUser: (state: AuthState) => state.user,
    selectError: (state: AuthState) => state.error
  },
  extraReducers: (builder) => {
    builder
      // Check user auth
      .addCase(checkUserAuthThunk.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(checkUserAuthThunk.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuthThunk.rejected, (state, action) => {
        state.error = action.error.message || 'check user auth failed';
        state.isAuthChecked = true;
      })
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
      })
      // Update user
      .addCase(updateUserThunk.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.error = action.error.message || 'update user failed';
        state.isAuthChecked = true;
      })
      // Logout
      .addCase(logoutThunk.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.error = null;
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.error.message || 'logout failed';
        state.isAuthChecked = true;
      });
  }
});

export const { setAuthChecked, setUser, setError } = authSlice.actions;
export const { selectError, selectIsAuthChecked, selectUser } =
  authSlice.selectors;
export default authSlice;
