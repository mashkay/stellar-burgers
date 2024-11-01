import { TOrder } from '@utils-types';
import profileFeedSlice from './profileFeedSlice';
import { fetchProfileFeedThunk } from './actions';
import { logoutThunk } from '../auth';

const order1: TOrder = {
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa093c'
  ],
  _id: 'order1',

  status: 'done',
  name: 'Жуткий био-марсианский бургер',
  createdAt: '2024-10-30T18:33:05.208Z',
  updatedAt: '2024-10-30T18:33:06.191Z',
  number: 1
};

const order2: TOrder = {
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa0942',
    '643d69a5c3f7b9001cfa093d'
  ],
  _id: 'order2',
  status: 'pending',
  name: 'Не съедобный бургер',
  createdAt: '2024-10-30T18:33:05.208Z',
  updatedAt: '2024-10-30T18:33:06.191Z',
  number: 2
};

const reducer = profileFeedSlice.reducer;

export const profileFeedSliceInitialState = {
  orders: [],
  error: null
};

const stateWithOrders = {
  ...profileFeedSliceInitialState,
  orders: [order1, order2]
};

describe('profileFeedSlice reducer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(
      profileFeedSliceInitialState
    );
  });

  it('should handle fetchProfileFeedThunk', () => {
    const action = {
      type: fetchProfileFeedThunk.fulfilled.type,
      payload: [order1, order2]
    };
    const expectedState = {
      ...profileFeedSliceInitialState,
      orders: [order1, order2],
      error: null
    };
    expect(reducer(profileFeedSliceInitialState, action)).toEqual(
      expectedState
    );
  });

  it('should handle fetchProfileFeedThunk rejected', () => {
    const action = {
      type: fetchProfileFeedThunk.rejected.type,
      error: { message: 'error' }
    };
    const expectedState = {
      ...profileFeedSliceInitialState,
      error: 'error'
    };
    expect(reducer(profileFeedSliceInitialState, action)).toEqual(
      expectedState
    );
  });

  it('should handle auth/logoutThunk fulfilled', () => {
    const action = {
      type: logoutThunk.fulfilled.type
    };
    const expectedState = {
      ...profileFeedSliceInitialState,
      orders: [],
      error: null
    };
    expect(reducer(stateWithOrders, action)).toEqual(expectedState);
  });
});
