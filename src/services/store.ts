import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsReduces from './slices/Ingredients-slice';
import constructorReduces from './slices/constructor-slice';
import feedReduces from './slices/feed-slice';
import orderReduces from './slices/order-slice';
import userSlice from './slices/user-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReduces,
  constructorBurger: constructorReduces,
  feed: feedReduces,
  order: orderReduces,
  user: userSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
