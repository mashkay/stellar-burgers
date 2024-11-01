import { TOrder } from '@utils-types';
import { fetchFeedsThunk } from './actions';
import feedSlice, {
  FeedState,
  selectIsLoading,
  selectOrders,
  selectOrdersDone,
  selectOrdersPending,
  selectTotal,
  selectTotalToday
} from './feedSlice';

const reducer = feedSlice.reducer;

export const feedSliceInitialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  isLoading: false
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

describe('feedSlice reducer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(
      feedSliceInitialState
    );
  });

  describe('fetchFeedsThunk', () => {
    it('pending', () => {
      const action = { type: fetchFeedsThunk.pending.type };
      const expectedState = {
        ...feedSliceInitialState,
        isLoading: true,
        error: null
      };
      expect(reducer(feedSliceInitialState, action)).toEqual(expectedState);
    });

    it('fulfilled', () => {
      const orders: TOrder[] = [order1, order2];
      const action = {
        type: fetchFeedsThunk.fulfilled.type,
        payload: { orders, total: 100, totalToday: 10 }
      };
      const expectedState = {
        ...feedSliceInitialState,
        orders,
        total: 100,
        totalToday: 10,
        isLoading: false,
        error: null
      };
      expect(reducer(feedSliceInitialState, action)).toEqual(expectedState);
    });

    it('rejected', () => {
      const message = 'FAIL MSG';
      const action = {
        type: fetchFeedsThunk.rejected.type,
        error: { message }
      };
      const expectedState = {
        ...feedSliceInitialState,
        isLoading: false,
        error: message
      };
      expect(reducer(feedSliceInitialState, action)).toEqual(expectedState);
    });
  });

  describe('feedSlice selectors', () => {
    const feedState: FeedState = {
      orders: [order1, order2],
      total: 100,
      totalToday: 10,
      error: null,
      isLoading: false
    };
    const state = { feed: feedState };

    it('should select orders', () => {
      expect(selectOrders(state)).toEqual(feedState.orders);
    });

    it('should select total', () => {
      expect(selectTotal(state)).toEqual(feedState.total);
    });

    it('should select totalToday', () => {
      expect(selectTotalToday(state)).toEqual(feedState.totalToday);
    });

    it('should select isLoading', () => {
      expect(selectIsLoading(state)).toEqual(feedState.isLoading);
    });

    it('should select orders done', () => {
      expect(selectOrdersDone(state)).toEqual([order1.number]);
    });

    it('should select orders pending', () => {
      expect(selectOrdersPending(state)).toEqual([order2.number]);
    });
  });
});
