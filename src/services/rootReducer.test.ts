import { rootReducer } from '@store';
import { authSliceInitialState } from './slices/auth/authSlice.test';
import { burgerConstructorSliceInitialState } from './slices/burgerConstructor/burgerConstructorSlice.test';
import { orderSliceInitialState } from './slices/order/orderSlice.test';
import { feedSliceInitialState } from './slices/feed/feedSlice.test';
import { profileFeedSliceInitialState } from './slices/profileFeed/profileFeedSlice.test';
import { ingredientsSliceInitialState } from './slices/ingredients/ingredientsSlice.test';
import { OrderPreviewInitialState } from './slices/orderPreview/orderPreviewSlice.test';

const initialState = {
  auth: authSliceInitialState,
  ingredients: ingredientsSliceInitialState,
  burgerConstructor: burgerConstructorSliceInitialState,
  order: orderSliceInitialState,
  feed: feedSliceInitialState,
  profileFeed: profileFeedSliceInitialState,
  orderPreview: OrderPreviewInitialState
};

describe('rootReducer', () => {
  it('Initialization: should return the initial state', () => {
    expect(rootReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('unnamed action: should return the initial state', () => {
    expect(rootReducer(initialState, { type: 'unknown' })).toEqual(
      initialState
    );
  });
});
