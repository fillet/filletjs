import { configureStore } from '@reduxjs/toolkit';

import reducers from '@config/Reducers';

import { notificationReduxMiddleware } from '@features/toastify-notification';

export const store = configureStore({
  reducer: reducers(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(notificationReduxMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const reduxNotifyError = (payload: unknown) => ({
  type: '@@APP_GLOBAL_ERROR',
  payload,
});

export const reduxNotifyInfo = (payload: unknown) => ({
  type: '@@APP_GLOBAL_INFO',
  payload,
});

export const reduxNotifySuccess = (payload: unknown) => ({
  type: '@@APP_GLOBAL_SUCCESS',
  payload,
});
