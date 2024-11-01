import orderPreviewSlice, {
  OrderPreviewState,
  selectIsLoading,
  selectOrder,
  selectIsOrderFetched
} from './orderPreviewSlice';
import { getOrderByNumberThunk } from './actions';
import { TOrder } from '@utils-types';

export const OrderPreviewInitialState: OrderPreviewState = {
  order: null,
  isLoading: false,
  pendingOrderNumber: null
};
const reducer = orderPreviewSlice.reducer;

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

const stateWhithdata = {
  order: order1,
  isLoading: false,
  pendingOrderNumber: 123
};

describe('orderPreviewSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(
      OrderPreviewInitialState
    );
  });

  describe('getOrderByNumberThunk', () => {
    it('pending', () => {
      const action = {
        type: getOrderByNumberThunk.pending.type,
        meta: { arg: 123 }
      };
      const expectedState = {
        ...OrderPreviewInitialState,
        isLoading: true,
        pendingOrderNumber: 123
      };
      expect(reducer(OrderPreviewInitialState, action)).toEqual(expectedState);
    });

    it('fulfilled', () => {
      const action = {
        type: getOrderByNumberThunk.fulfilled.type,
        payload: order1
      };
      const expectedState = {
        ...OrderPreviewInitialState,
        isLoading: false,
        order: order1
      };
      expect(reducer(OrderPreviewInitialState, action)).toEqual(expectedState);
    });
  });

  describe('selectors', () => {
    const state = { orderPreview: stateWhithdata };

    it('selectOrder should return the order', () => {
      expect(selectOrder(state)).toEqual(stateWhithdata.order);
    });

    it('selectIsLoading should return the loading state', () => {
      expect(selectIsLoading(state)).toEqual(stateWhithdata.isLoading);
    });

    it('selectIsOrderFetched should return true if order is fetched and not loading', () => {
      expect(selectIsOrderFetched(state, 123)).toBe(true);
    });

    it('selectIsOrderFetched should return false if order is not fetched or loading', () => {
      const loadingState = {
        orderPreview: { ...stateWhithdata, isLoading: true }
      };
      expect(selectIsOrderFetched(loadingState, 123)).toBe(false);
      expect(selectIsOrderFetched(state, 456)).toBe(false);
    });
  });
});
