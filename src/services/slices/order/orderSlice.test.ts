import { TOrder } from '@utils-types';
import orderSlice, { OrderState } from './orderSlice';
import { placeOrderThunk } from './actions';
import { logoutThunk } from '../auth';

const reducer = orderSlice.reducer;

export const orderSliceInitialState: OrderState = {
  error: null,
  isProcessing: false,
  order: null,
  lastOrder: null
};

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

describe('orderSlice reducer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(
      orderSliceInitialState
    );
  });
  it('should handle clearOrder', () => {
    const state = {
      ...orderSliceInitialState,
      error: 'error',
      order: order1,
      lastOrder: order2
    };
    expect(reducer(state, { type: 'order/clearOrder' })).toEqual({
      ...state,
      error: orderSliceInitialState.error,
      order: orderSliceInitialState.order
    });
  });
  describe('placeOrderThunk', () => {
    const cases = [
      { name: 'initialState', state: orderSliceInitialState },
      { name: 'error', state: { ...orderSliceInitialState, error: 'error' } },
      { name: 'order', state: { ...orderSliceInitialState, order: order1 } }
    ];

    cases.forEach(({ name, state }) => {
      it(`${name} pending`, () => {
        expect(
          reducer(state, {
            type: placeOrderThunk.pending.type
          })
        ).toEqual({
          ...state,
          error: null,
          isProcessing: true
        });
      });
      it(`${name} fulfilled`, () => {
        expect(
          reducer(state, {
            type: placeOrderThunk.fulfilled.type,
            payload: { order: order2 }
          })
        ).toEqual({
          ...state,
          order: order2,
          lastOrder: order2,
          isProcessing: false,
          error: null
        });
      });
      it(`${name} rejected`, () => {
        expect(
          reducer(state, {
            type: placeOrderThunk.rejected.type,
            error: { message: 'error' }
          })
        ).toEqual({
          ...state,
          error: 'error',
          isProcessing: false
        });
      });
    });
  });
  it('cleanup on logoutThunk.fulfilled', () => {
    expect(
      reducer(
        {
          ...orderSliceInitialState,
          error: 'error',
          order: order1,
          lastOrder: order2
        },
        { type: logoutThunk.fulfilled.type }
      )
    ).toEqual(orderSliceInitialState);
  });
});
