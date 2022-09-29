import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import table from 'src/store/slices/tableSlice';
import authorization from 'src/store/slices/authorizationSlice';

export const store = configureStore({
  reducer: {
    table,
    authorization,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
