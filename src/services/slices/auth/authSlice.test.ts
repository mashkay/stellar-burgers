import {
  checkUserAuthThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  updateUserThunk
} from './actions';
import authSlice, {
  AuthState,
  selectAuthError,
  selectIsAuthChecked,
  selectLoginError,
  selectLogoutError,
  selectRegisterError,
  selectUpdateError,
  selectUser,
  setAuthChecked,
  setUser
} from './authSlice';

import { TUser } from '@utils-types';

const { reducer } = authSlice;

const authSliceInitialState: AuthState = {
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

const stateWithCheckedAuth = {
  ...authSliceInitialState,
  isAuthChecked: true
};
const user: TUser = { name: 'AweSomeUser', email: 'awesome@email.yea' };
const stateWithUser = {
  ...authSliceInitialState,
  isAuthChecked: true,
  user: user
};

const stateWithUserAndErrors = {
  ...stateWithUser,
  errors: {
    login: 'Login error',
    register: 'Register error',
    update: 'Update error',
    logout: 'Logout',
    auth: 'Auth error'
  }
};

describe('authSlice', () => {
  describe('initialization', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(
        authSliceInitialState
      );
    });

    it('should not change state on unknown action', () => {
      const action = { type: 'unknown' };
      const actual = reducer(stateWithCheckedAuth, action);
      expect(actual).toEqual(stateWithCheckedAuth);
    });
  });

  describe('reducers', () => {
    it('should handle setAuthChecked', () => {
      const actual = authSlice.reducer(
        authSliceInitialState,
        setAuthChecked(true)
      );
      expect(actual.isAuthChecked).toEqual(true);
    });

    it('should handle setUser', () => {
      const actual = authSlice.reducer(authSliceInitialState, setUser(user));
      expect(actual.user).toEqual(user);
    });
  });

  describe('extraReducers', () => {
    const cases = [
      { name: 'initialState', state: authSliceInitialState },
      { name: 'NonAuthState', state: stateWithCheckedAuth }
    ];
    describe('loginThunk cases', () => {
      cases.forEach((item) => {
        it(`${item.name} should handle loginThunk.pending`, () => {
          const actual = reducer(item.state, {
            type: loginThunk.pending.type
          });
          expect(actual.errors.login).toEqual(null);
          expect(actual.isAuthChecked).toEqual(false);
        });

        it(`${item.name} should handle loginThunk.fulfilled`, () => {
          const actual = reducer(item.state, {
            type: loginThunk.fulfilled.type,
            payload: user
          });
          expect(actual.errors.login).toEqual(null);
          expect(actual.user).toEqual(user);
          expect(actual.isAuthChecked).toEqual(true);
        });

        it(`${item.name} should handle loginThunk.rejected`, () => {
          const message = 'Login FAIL MSG';
          const actual = reducer(item.state, {
            type: loginThunk.rejected.type,
            error: { message }
          });
          expect(actual.errors.login).toEqual(message);
          expect(actual.isAuthChecked).toEqual(true);
        });
      });
    });

    describe('registerThunk cases', () => {
      cases.forEach((item) => {
        it(`${item.name} should handle registerThunk.pending`, () => {
          const actual = reducer(item.state, {
            type: registerThunk.pending.type
          });
          expect(actual.errors.register).toEqual(null);
          expect(actual.isAuthChecked).toEqual(false);
        });

        it(`${item.name} should handle registerThunk.fulfilled`, () => {
          const actual = reducer(item.state, {
            type: registerThunk.fulfilled.type,
            payload: user
          });
          expect(actual.errors.register).toEqual(null);
          expect(actual.user).toEqual(user);
          expect(actual.isAuthChecked).toEqual(true);
        });

        it(`${item.name} should handle registerThunk.rejected`, () => {
          const message = 'register FAIL MSG';
          const actual = reducer(item.state, {
            type: registerThunk.rejected.type,
            error: { message }
          });
          expect(actual.errors.register).toEqual(message);
          expect(actual.isAuthChecked).toEqual(true);
        });
      });

      describe('checkUserAuthThunk cases', () => {
        it('should handle checkUserAuthThunk.pending', () => {
          const actual = reducer(authSliceInitialState, {
            type: checkUserAuthThunk.pending.type
          });
          expect(actual.errors.auth).toEqual(null);
          expect(actual.isAuthChecked).toEqual(false);
        });

        it('should handle checkUserAuthThunk.fulfilled', () => {
          const actual = reducer(authSliceInitialState, {
            type: checkUserAuthThunk.fulfilled.type,
            payload: user
          });
          expect(actual.errors.auth).toEqual(null);
          expect(actual.user).toEqual(user);
          expect(actual.isAuthChecked).toEqual(true);
        });

        it('should handle checkUserAuthThunk.rejected', () => {
          const message = 'auth FAIL MSG';
          const actual = reducer(authSliceInitialState, {
            type: checkUserAuthThunk.rejected.type,
            error: { message }
          });
          expect(actual.errors.auth).toEqual(message);
          expect(actual.isAuthChecked).toEqual(true);
        });
      });

      describe('logoutThunk cases', () => {
        it('should handle logoutThunk.pending', () => {
          const actual = reducer(stateWithUser, {
            type: logoutThunk.pending.type
          });
          expect(actual.errors.logout).toEqual(null);
          expect(actual.isAuthChecked).toEqual(false);
        });

        it('should handle logoutThunk.fulfilled', () => {
          const actual = reducer(stateWithUser, {
            type: logoutThunk.fulfilled.type
          });
          expect(actual.errors.logout).toEqual(null);
          expect(actual.user).toEqual(null);
          expect(actual.isAuthChecked).toEqual(true);
        });
        it('should handle logoutThunk.rejected', () => {
          const message = 'logout FAIL MSG';
          const actual = reducer(stateWithUser, {
            type: logoutThunk.rejected.type,
            error: { message }
          });
          expect(actual.errors.logout).toEqual(message);
          expect(actual.isAuthChecked).toEqual(true);
        });
      });
      describe('updateUserThunk cases', () => {
        it('should handle updateUserThunk.pending', () => {
          const actual = reducer(stateWithUserAndErrors, {
            type: updateUserThunk.pending.type
          });
          expect(actual.errors.update).toEqual(null);
          expect(actual.isAuthChecked).toEqual(false);
        });

        it('should handle updateUserThunk.fulfilled', () => {
          const actual = reducer(stateWithUserAndErrors, {
            type: updateUserThunk.fulfilled.type,
            payload: user
          });
          expect(actual.errors.update).toEqual(null);
          expect(actual.user).toEqual(user);
          expect(actual.isAuthChecked).toEqual(true);
        });
        it('should handle updateUserThunk.rejected', () => {
          const message = 'update FAIL MSG';
          const actual = reducer(stateWithUserAndErrors, {
            type: updateUserThunk.rejected.type,
            error: { message }
          });
          expect(actual.errors.update).toEqual(message);
          expect(actual.isAuthChecked).toEqual(true);
        });
      });
    });
  });

  describe('selectors', () => {
    const state = { auth: stateWithUserAndErrors };
    it('should select isAuthChecked', () => {
      expect(selectIsAuthChecked(state)).toEqual(true);
    });

    it('should select user', () => {
      expect(selectUser(state)).toEqual(user);
    });
    it('should select login error', () => {
      expect(selectLoginError(state)).toEqual(
        stateWithUserAndErrors.errors.login
      );
    });
    it('should select register error', () => {
      expect(selectRegisterError(state)).toEqual(
        stateWithUserAndErrors.errors.register
      );
    });
    it('should select update error', () => {
      expect(selectUpdateError(state)).toEqual(
        stateWithUserAndErrors.errors.update
      );
    });
    it('should select logout error', () => {
      expect(selectLogoutError(state)).toEqual(
        stateWithUserAndErrors.errors.logout
      );
    });
    it('should select auth error', () => {
      expect(selectAuthError(state)).toEqual(
        stateWithUserAndErrors.errors.auth
      );
    });
  });
});
