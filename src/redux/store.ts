'use client';

import middlewares from '@akinon/next/redux/middlewares';
import reducers from '@akinon/next/redux/reducers';
import {
  Action,
  AnyAction,
  configureStore,
  Store,
  ThunkAction,
  ThunkDispatch
} from '@reduxjs/toolkit';
import categoryReducer from '@theme/redux/reducers/category';
import categoryMiddleware from '@theme/redux/middlewares/category';

const _reducers = {
  ...reducers,
  category: categoryReducer
};

const _middlewares = [...middlewares, categoryMiddleware];

export const makeStore = (): Store<{
  [key in keyof typeof _reducers]: ReturnType<typeof _reducers[key]>;
}> =>
  configureStore({
    reducer: _reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([..._middlewares])
  });

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = makeStore();
