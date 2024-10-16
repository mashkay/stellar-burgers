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
  errors: {
    login: string | null;
    register: string | null;
    update: string | null;
    logout: string | null;
    auth: string | null;
  };
}

const initialState: AuthState = {
  isAuthChecked: false,
  user: null,
  errors: {
    login: null,
    register: null,
    update: null,
    logout: null,
    auth: null
  }
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
    }
  },
  selectors: {
    selectIsAuthChecked: (state: AuthState) => state.isAuthChecked,
    selectUser: (state: AuthState) => state.user,
    selectLoginError: (state: AuthState) => state.errors.login,
    selectRegisterError: (state: AuthState) => state.errors.register,
    selectUpdateError: (state: AuthState) => state.errors.update,
    selectLogoutError: (state: AuthState) => state.errors.logout,
    selectAuthError: (state: AuthState) => state.errors.auth
  },
  extraReducers: (builder) => {
    builder
      // Check user auth
      .addCase(checkUserAuthThunk.pending, (state) => {
        state.errors.auth = null;
        state.isAuthChecked = false;
      })
      .addCase(checkUserAuthThunk.fulfilled, (state, action) => {
        state.errors.auth = null;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuthThunk.rejected, (state, action) => {
        state.errors.auth = action.error.message || 'check user auth failed';
        state.isAuthChecked = true;
      })
      // Login
      .addCase(loginThunk.pending, (state) => {
        state.errors.login = null;
        state.isAuthChecked = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.errors.login = null;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.errors.login = action.error.message || 'login failed';
        state.isAuthChecked = true;
      })
      // Register
      .addCase(registerThunk.pending, (state) => {
        state.errors.register = null;
        state.isAuthChecked = false;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.errors.register = null;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.errors.register = action.error.message || 'register failed';
        state.isAuthChecked = true;
      })
      // Update user
      .addCase(updateUserThunk.pending, (state) => {
        state.errors.update = null;
        state.isAuthChecked = false;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.errors.update = null;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.errors.update = action.error.message || 'update user failed';
        state.isAuthChecked = true;
      })
      // Logout
      .addCase(logoutThunk.pending, (state) => {
        state.errors.logout = null;
        state.isAuthChecked = false;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.errors.logout = null;
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.errors.logout = action.error.message || 'logout failed';
        state.isAuthChecked = true;
      });
  }
});

export const { setAuthChecked, setUser } = authSlice.actions;
export const {
  selectIsAuthChecked,
  selectUser,
  selectLoginError,
  selectRegisterError,
  selectUpdateError,
  selectLogoutError,
  selectAuthError
} = authSlice.selectors;
export default authSlice;
