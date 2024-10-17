import { combineSlices, configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth/authSlice';
import ingredientsSlice from './slices/ingredients/ingredientsSlice';
import burgerConstructorSlice from './slices/burgerConstructor/burgerConstructorSlice';
import orderSlice from './slices/order/orderSlice';
import feedSlice from './slices/feed/feedSlice';
import profileFeedSlice from './slices/profileFeed/profileFeedSlice';
import orderPreview from './slices/orderPreview/orderPreviewSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineSlices(
  authSlice,
  ingredientsSlice,
  burgerConstructorSlice,
  orderSlice,
  feedSlice,
  profileFeedSlice,
  orderPreview
); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
